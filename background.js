chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: [255, 11, 39, 1] });
  chrome.action.setBadgeText({
    text: "GO!",
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.action.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
  chrome.action.setBadgeText({
    text: "ON",
  });
  if (tab && tab.url) {
    const currentUrl = encodeURIComponent(tab.url);
    const redirectUrl = `https://archive.is/${currentUrl}`;
    chrome.tabs.update(tab.id, { url: redirectUrl }, () => {
      chrome.action.setBadgeBackgroundColor({ color: [0, 228, 140, 1] });
      chrome.action.setBadgeText({
        text: "YAY",
      });
      setTimeout(() => {
        chrome.action.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
        chrome.action.setBadgeText({
          text: "NEXT",
        });
      }, 3000);
    });
  }
});

/*chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const extensions = "https://developer.chrome.com/docs/extensions";
const w3schools = "https://www.w3schools.com/css/";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(w3schools)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "ON") {
      console.log("if nextstate TEST")
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["styles.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["styles.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
*/
