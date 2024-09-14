let extensionEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "tabActivated") {
    console.log('Tab activated.');
    checkAndResumeVideo();
  } else if (request.action === "toggleState") {
    extensionEnabled = request.enabled;
    console.log('Extension state changed. Auto pause/resume is ' + (extensionEnabled ? 'enabled' : 'disabled'));
  }
});

document.addEventListener('visibilitychange', () => {
  if (!extensionEnabled) return;

  if (document.visibilityState === 'hidden') {
    console.log('Tab hidden. Pausing video.');
    pauseVideo();
  } else if (document.visibilityState === 'visible') {
    console.log('Tab visible. Checking to resume video.');
    checkAndResumeVideo();
  }
});

function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    video.pause();
    console.log('Video paused.');
  }
}

function checkAndResumeVideo() {
  if (!extensionEnabled) return;

  const video = document.querySelector("video");
  if (video && video.paused && document.visibilityState === 'visible') {
    video.play();
    console.log('Video resumed.');
  }
}

chrome.storage.sync.get('enabled', (data) => {
  extensionEnabled = data.enabled !== false; // Default to enabled if not set
  console.log('Extension state loaded on content script initialization. Auto pause/resume is ' + (extensionEnabled ? 'enabled' : 'disabled'));
});
