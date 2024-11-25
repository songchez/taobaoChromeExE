document
  .getElementById("start-download")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // 상태 컨테이너 표시
    document.getElementById("status-container").style.display = "block";
    document.getElementById("progress-container").style.display = "block";
    document.getElementById("start-download").disabled = true;

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      () => {
        console.log("Content script injected.");
      }
    );
  });

// 메시지 리스너 추가
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "IMAGE_COUNT") {
    document.getElementById(
      "image-count"
    ).textContent = `찾은 이미지: ${message.count}개`;
  }

  if (message.type === "DOWNLOAD_PROGRESS") {
    const progress = document.getElementById("download-progress");
    const statusText = document.getElementById("status-text");
    progress.value = message.progress;
    statusText.textContent = `다운로드 중... ${message.progress}%`;

    if (message.progress === 100) {
      statusText.textContent = "다운로드 완료!";
      setTimeout(() => {
        window.close();
      }, 1000);
    }
  }
});
