const getBlocklist = (callback) => {
  chrome.storage.sync.get(["blocklist"], (result) => {
    const blocklist = result.blocklist || [];
    callback(blocklist);
  });
};

// Example usage of getBlocklist
getBlocklist((blocklist) => {
  console.log("Blocklist retrieved:", blocklist);
});

//for getting the url the user is currently in
// const getCurrentTabUrl = (callback) => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (tabs.length > 0) {
//       const url = tabs[0].url;
//       callback(url);
//     } else {
//       callback(null); // No active tab found
//     }
//   });
// };

// // Example usage to log the current URL
// getCurrentTabUrl((url) => {
//   console.log("Current URL:", url);
//   return url;
// });
// // Function to check if a URL is in the blocklist
// const isUrlBlocked = (url, callback) => {
//   chrome.storage.sync.get(["blocklist"], (result) => {
//     const blocklist = result.blocklist || [];
//     const isBlocked = blocklist.some((blockedUrl) => url.includes(blockedUrl));
//     callback(isBlocked);
//   });
// };

// // Example usage:
// const urlToCheck = getCurrentTabUrl;
// isUrlBlocked(urlToCheck, (blocked) => {
//   if (blocked) {
//     console.log(`${urlToCheck} is blocked`);
//   } else {
//     console.log(`${urlToCheck} is not blocked`);
//   }
// });
// Function to get current URL of active tab
// Function to get current URL of active tab
// Function to get current URL of active tab
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
          //   console.log(`${currentUrl} is blocked`);
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

// Interval to track current URL every 5 seconds
setInterval(logCurrentUrlAndCheckBlocked, 1000);
