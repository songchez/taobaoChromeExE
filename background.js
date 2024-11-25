chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// 다운로드 진행 상황을 추적
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "DOWNLOAD_PROGRESS") {
    console.log(`다운로드 진행률: ${request.progress}%`);
  }
});
