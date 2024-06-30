//getting the blocklist from chrome.storage
const getBlocklist = (callback) => {
  chrome.storage.sync.get(["blocklist"], (result) => {
    const blocklist = result.blocklist || [];
    callback(blocklist);
  });
};

// logging the current blocklist
getBlocklist((blocklist) => {
  console.log("Blocklist retrieved:", blocklist);
});

//getting the current url,the user is visiting
const getCurrentTabUrl = (callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const url = tabs[0].url;
      callback(url);
    } else {
      callback(null); // No active tab found
    }
  });
};

// Function to check if a URL is in the blocklist and block the site if blocked
const isUrlBlocked = (url, callback) => {
  chrome.storage.sync.get(["blocklist"], (result) => {
    const blocklist = result.blocklist || [];
    const isBlocked = blocklist.some((blockedUrl) => url.includes(blockedUrl));
    callback(isBlocked);
  });
};

// Function to log current URL and check if it's blocked
const logCurrentUrlAndCheckBlocked = () => {
  getCurrentTabUrl((currentUrl) => {
    if (currentUrl) {
      //   console.log("Current URL:", currentUrl);
      isUrlBlocked(currentUrl, (blocked) => {
        if (blocked) {
          // Block the site by updating tab URL to blocked.html
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            chrome.tabs.update(tabId, {
              url: chrome.runtime.getURL("blocked.html"),
            });
          });
        } else {
          //   console.log(`${currentUrl} is not blocked`);
        }
      });
    } else {
      //   console.log("No active tab found.");
    }
  });
};

// Interval to track current URL every second
setInterval(logCurrentUrlAndCheckBlocked, 1000);
