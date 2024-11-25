console.log("Content script loaded!");

// JSZip 라이브러리를 동적으로 로드
const loadJSZip = async () => {
  const jsZipURL = chrome.runtime.getURL("jszip.min.js");
  await import(jsZipURL);
};

(async () => {
  try {
    await loadJSZip();

    // 이미지 선택 로직 수정
    const images = Array.from(document.querySelectorAll("img"))
      .map((img) => {
        // 원본 이미지 URL 가져오기 시도
        const originalSrc =
          img.getAttribute("data-ks-lazyload") || // 지연 로딩된 이미지
          img.getAttribute("data-src") || // 데이터 속성의 원본
          img.src; // 일반 src
        return originalSrc;
      })
      .filter((src) => {
        // 유효한 이미지 URL만 필터링
        return (
          src &&
          (src.includes(".jpg") ||
            src.includes(".jpeg") ||
            src.includes("tmall.com") ||
            src.includes("alicdn.com"))
        );
      });

    console.log("찾은 이미지 수:", images.length);
    console.log("이미지 URL들:", images);

    if (images.length === 0) {
      alert("이미지를 찾을 수 없습니다.");
      return;
    }

    // 이미지 개수 메시지 전송
    chrome.runtime.sendMessage({
      type: "IMAGE_COUNT",
      count: images.length,
    });

    const zip = new JSZip();
    let count = 0;
    const total = images.length;

    for (const url of images) {
      try {
        const response = await fetch(url, {
          headers: {
            Referer: "https://www.tmall.com",
            "User-Agent": navigator.userAgent,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        if (blob.type.includes("image")) {
          // 이미지 타입 확인
          zip.file(`image_${++count}.jpg`, blob);

          // 진행률 업데이트
          const progress = Math.round((count / total) * 100);
          chrome.runtime.sendMessage({
            type: "DOWNLOAD_PROGRESS",
            progress: progress,
          });
        }
      } catch (err) {
        console.error(`이미지 다운로드 실패: ${url}`, err);
      }
    }

    if (count === 0) {
      alert("다운로드 가능한 이미지를 찾을 수 없습니다.");
      return;
    }

    const content = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    });

    const a = document.createElement("a");
    const url = URL.createObjectURL(content);
    a.href = url;
    a.download = `tmall_images_${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("다운로드 중 오류 발생:", error);
    alert("다운로드 중 오류가 발생했습니다.");
  }
})();
