console.log("Content script loaded!");

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
document.body.appendChild(script);

script.onload = () => {
  console.log("JSZip loaded");
};

(async () => {
  try {
    const images = Array.from(document.querySelectorAll("img"))
      .map((img) => img.src)
      .filter((src) => src && src.match(/\.(jpg|jpeg)$/i));

    if (images.length === 0) {
      alert("이미지를 찾을 수 없습니다.");
      return;
    }

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
        zip.file(`image_${++count}.jpg`, blob);

        // 진행률 업데이트
        const progress = Math.round((count / total) * 100);
        chrome.runtime.sendMessage({
          type: "DOWNLOAD_PROGRESS",
          progress: progress,
        });
      } catch (err) {
        console.error(`이미지 다운로드 실패: ${url}`, err);
      }
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
