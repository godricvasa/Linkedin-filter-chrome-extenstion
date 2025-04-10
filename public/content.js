// const trustedUsers = [
//   "Iswaryaa G P",
//   "Chidanand Tripathi",
//   "Tripti Jain",
//   "Harsh Kumar",
//   "Sahil Gaba",
//   "Abhishek Vijayvargia",
//   "Kirubakaran S",
//   "Ajit Kumar",
//   "Kishore Anbu",
//   "Rehan Sattar",
//   "Danish Gulsher",
// ];

// // Function to sanitize and normalize usernames
// const normalizeUsername = (name) => {
//   return name
//     .replace(/[^\w\s]/gi, "") // Remove special characters
//     .replace(/\s+/g, " ") // Remove extra spaces
//     .trim()
//     .toLowerCase();
// };

// const hideUntrustedPosts = () => {
//   document.querySelectorAll(".feed-shared-update-v2").forEach((post) => {
//     const authorElement = post.querySelector(
//       ".SiDQJEyLnTxciztqbnNZAOLfEcyrlQ span[aria-hidden='true']"
//     );

//     if (authorElement) {
//       let authorName = authorElement.innerText.trim();
//       console.log("Extracted Username:", authorName); // Debugging line

//       // Normalize username
//       let normalizedAuthor = normalizeUsername(authorName);
//       const trustedLower = trustedUsers.map(normalizeUsername);

//       // Hide post if author is not trusted and is a person (not a group)
//       if (
//         !trustedLower.includes(normalizedAuthor) &&
//         authorName.split(" ").length > 1
//       ) {
//         console.log("Hiding post by:", authorName);
//         post.style.display = "none";
//       }
//     } else {
//       console.log("Author element not found in this post.");
//     }
//   });
// };

// const observeChanges = () => {
//   if (!document.body) {
//     setTimeout(observeChanges, 100);
//     return;
//   }

//   // Use a MutationObserver to detect feed updates
//   const observer = new MutationObserver(() => {
//     clearTimeout(window.hidePostTimeout);
//     window.hidePostTimeout = setTimeout(hideUntrustedPosts, 300); // Debounced call
//   });

//   observer.observe(document.body, { childList: true, subtree: true });

//   hideUntrustedPosts();
// };

// // Initialize the script
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", observeChanges);
// } else {
//   observeChanges();
// // }
// const trustedUsers = [
//   "Iswaryaa G P",
//   "Chidanand Tripathi",
//   "Tripti Jain",
//   "Harsh Kumar",
//   "Sahil Gaba",
//   "Abhishek Vijayvargia",
//   "Kirubakaran S",
//   "Ajit Kumar",
//   "Kishore Anbu",
//   "Rehan Sattar",
//   "Danish Gulsher",
// ];

// // Function to sanitize and normalize usernames
// const normalizeUsername = (name) => {
//   return name
//     .replace(/[^\w\s]/gi, "") // Remove special characters
//     .replace(/\s+/g, " ") // Remove extra spaces
//     .trim()
//     .toLowerCase();
// };

// const hideUntrustedPosts = () => {
//   console.log("Running hideUntrustedPosts...");
//   const posts = document.querySelectorAll(".feed-shared-update-v2");
//   console.log(`Found ${posts.length} posts to check`);

//   posts.forEach((post) => {
//     // Try multiple potential author selectors for better resilience
//     const authorElement =
//       post.querySelector(".update-components-actor__title") ||
//       post.querySelector(
//         ".update-components-actor__container a[data-control-name='actor']"
//       ) ||
//       post.querySelector(".update-components-actor__container span");

//     if (authorElement) {
//       let authorName = authorElement.innerText.trim();
//       console.log("Extracted Username:", authorName);

//       // Normalize username
//       let normalizedAuthor = normalizeUsername(authorName);
//       const trustedLower = trustedUsers.map(normalizeUsername);

//       // Hide post if author is not trusted and is a person (not a group)
//       if (
//         !trustedLower.includes(normalizedAuthor) &&
//         authorName.split(" ").length > 1
//       ) {
//         console.log("Hiding post by:", authorName);
//         post.style.display = "none";
//       } else {
//         console.log("Keeping post by:", authorName);
//         post.style.display = "block"; // Ensure previously hidden posts can reappear
//       }
//     } else {
//       console.log("Author element not found in this post.");
//     }
//   });
// };

// const throttle = (func, limit) => {
//   let inThrottle;
//   return function () {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };

// const throttledHideUntrustedPosts = throttle(hideUntrustedPosts, 1000);

// const observeChanges = () => {
//   if (!document.body) {
//     setTimeout(observeChanges, 100);
//     return;
//   }

//   console.log("Setting up MutationObserver...");

//   // Use a MutationObserver to detect feed updates
//   const observer = new MutationObserver((mutations) => {
//     // Check if mutations affect the feed area
//     const relevantChanges = mutations.some((mutation) => {
//       // Check if the mutation target or any added nodes contain feed posts
//       return (
//         mutation.target.querySelector(".feed-shared-update-v2") ||
//         Array.from(mutation.addedNodes).some(
//           (node) =>
//             node.nodeType === 1 &&
//             (node.classList?.contains("feed-shared-update-v2") ||
//               node.querySelector(".feed-shared-update-v2"))
//         )
//       );
//     });

//     if (relevantChanges) {
//       console.log("Feed changes detected, updating filters...");
//       throttledHideUntrustedPosts();
//     }
//   });

//   // Target the main feed container for more efficient observation
//   const feedContainer =
//     document.querySelector(".scaffold-finite-scroll__content") || document.body;

//   observer.observe(feedContainer, {
//     childList: true,
//     subtree: true,
//   });

//   // Initial run
//   hideUntrustedPosts();

//   // Also run periodically to catch any missed updates
//   setInterval(hideUntrustedPosts, 5000);
// };

// // Initialize the script
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", observeChanges);
// } else {
//   observeChanges();
// }

// // Add visual indicator that the script is running
// const addStatusIndicator = () => {
//   const indicator = document.createElement("div");
//   indicator.style.cssText = `
//       position: fixed;
//       bottom: 10px;
//       right: 10px;
//       background: rgba(0, 120, 212, 0.8);
//       color: white;
//       padding: 5px 10px;
//       border-radius: 5px;
//       font-size: 12px;
//       z-index: 9999;
//     `;
//   indicator.textContent = `LinkedIn Filter: ${trustedUsers.length} trusted users`;
//   document.body.appendChild(indicator);

//   indicator.addEventListener("click", () => {
//     alert(`Currently showing posts only from:\n${trustedUsers.join("\n")}`);
//   });
// };

// setTimeout(addStatusIndicator, 1500);
// const trustedUsers = [
//   "Iswaryaa G P",
//   "Chidanand Tripathi",
//   "Tripti Jain",
//   "Harsh Kumar",
//   "Sahil Gaba",
//   "Abhishek Vijayvargia",
//   "Kirubakaran S",
//   "Ajit Kumar",
//   "Kishore Anbu",
//   "Rehan Sattar",
//   "Danish Gulsher",
//   "Dr.Shubhra Chakraborty🎯Dr.Shubhra Chakraborty🎯",
// ];

// // Function to sanitize and normalize usernames
// const normalizeUsername = (name) => {
//   return name
//     .replace(/[^\w\s]/gi, "") // Remove special characters
//     .replace(/\s+/g, " ") // Remove extra spaces
//     .trim()
//     .toLowerCase();
// };

// const hideUntrustedPosts = () => {
//   console.log("Running hideUntrustedPosts...");
//   const posts = document.querySelectorAll(".feed-shared-update-v2");
//   console.log(`Found ${posts.length} posts to check`);

//   posts.forEach((post) => {
//     // First check if it's a promoted/sponsored post
//     const isPromoted = checkIfPromoted(post);

//     if (isPromoted) {
//       console.log("Hiding promoted post");
//       post.style.display = "none";
//       return; // Skip further processing for this post
//     }

//     // Try multiple potential author selectors for better resilience
//     const authorElement =
//       post.querySelector(".update-components-actor__title") ||
//       post.querySelector(
//         ".update-components-actor__container a[data-control-name='actor']"
//       ) ||
//       post.querySelector(".update-components-actor__container span") ||
//       post.querySelector("[data-test-id='actor-name']");

//     if (authorElement) {
//       let authorName = authorElement.innerText.trim();
//       console.log("Extracted Username:", authorName);

//       // Normalize username
//       let normalizedAuthor = normalizeUsername(authorName);
//       const trustedLower = trustedUsers.map(normalizeUsername);

//       // Hide post if author is not trusted and is a person (not a group)
//       if (
//         !trustedLower.includes(normalizedAuthor) &&
//         authorName.split(" ").length > 1
//       ) {
//         console.log("Hiding post by:", authorName);
//         post.style.display = "none";
//       } else {
//         console.log("Keeping post by:", authorName);
//         post.style.display = "block"; // Ensure previously hidden posts can reappear
//       }
//     } else {
//       console.log("Author element not found in this post - hiding to be safe");
//       post.style.display = "none"; // Hide posts where we can't identify the author
//     }
//   });
// };

// // Function to check if a post is promoted/sponsored
// const checkIfPromoted = (post) => {
//   // Multiple ways to detect promoted content

//   // 1. Check for "Promoted" text in the header
//   const headerTexts = Array.from(
//     post.querySelectorAll(
//       ".update-components-header__text-view, .feed-shared-actor__sub-description, .update-components-actor__sub-description"
//     )
//   );
//   for (const element of headerTexts) {
//     const text = element.innerText.toLowerCase();
//     if (
//       text.includes("promoted") ||
//       text.includes("sponsored") ||
//       text.includes("ad")
//     ) {
//       return true;
//     }
//   }

//   // 2. Check for specific sponsored content attributes
//   if (
//     post.querySelector("[data-ad-id]") ||
//     post.querySelector("[data-test-id='ad-component']") ||
//     post.hasAttribute("data-ad-id") ||
//     post.classList.contains("feed-shared-update--sponsored")
//   ) {
//     return true;
//   }

//   // 3. Check for any data attributes containing "sponsored" or "promoted"
//   const allElements = post.querySelectorAll("*");
//   for (const el of allElements) {
//     for (const attr of el.attributes) {
//       if (
//         attr.name.includes("data-") &&
//         (attr.value.includes("sponsor") ||
//           attr.value.includes("promot") ||
//           attr.value.includes("ad"))
//       ) {
//         return true;
//       }
//     }
//   }

//   return false;
// };

// const throttle = (func, limit) => {
//   let inThrottle;
//   return function () {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };

// const throttledHideUntrustedPosts = throttle(hideUntrustedPosts, 1000);

// const observeChanges = () => {
//   if (!document.body) {
//     setTimeout(observeChanges, 100);
//     return;
//   }

//   console.log("Setting up MutationObserver...");

//   // Use a MutationObserver to detect feed updates
//   const observer = new MutationObserver((mutations) => {
//     // Check if mutations affect the feed area
//     const relevantChanges = mutations.some((mutation) => {
//       // Check if the mutation target or any added nodes contain feed posts
//       return (
//         mutation.target.querySelector(".feed-shared-update-v2") ||
//         Array.from(mutation.addedNodes).some(
//           (node) =>
//             node.nodeType === 1 &&
//             (node.classList?.contains("feed-shared-update-v2") ||
//               node.querySelector(".feed-shared-update-v2"))
//         )
//       );
//     });

//     if (relevantChanges) {
//       console.log("Feed changes detected, updating filters...");
//       throttledHideUntrustedPosts();
//     }
//   });

//   // Target the main feed container for more efficient observation
//   const feedContainer =
//     document.querySelector(".scaffold-finite-scroll__content") ||
//     document.querySelector(".core-rail") ||
//     document.body;

//   observer.observe(feedContainer, {
//     childList: true,
//     subtree: true,
//   });

//   // Initial run
//   hideUntrustedPosts();

//   // Run more frequently initially, then less frequently
//   const runIntervals = [1000, 2000, 3000, 5000, 10000];
//   runIntervals.forEach((interval) => {
//     setTimeout(hideUntrustedPosts, interval);
//   });

//   // Also run periodically to catch any missed updates
//   setInterval(hideUntrustedPosts, 10000);
// };

// // Initialize the script
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", observeChanges);
// } else {
//   observeChanges();
// }

// // Add visual indicator that the script is running
// const addStatusIndicator = () => {
//   const indicator = document.createElement("div");
//   indicator.style.cssText = `
//       position: fixed;
//       bottom: 10px;
//       right: 10px;
//       background: rgba(0, 120, 212, 0.8);
//       color: white;
//       padding: 5px 10px;
//       border-radius: 5px;
//       font-size: 12px;
//       z-index: 9999;
//       cursor: pointer;
//     `;
//   indicator.textContent = `LinkedIn Filter: ${trustedUsers.length} trusted users`;
//   document.body.appendChild(indicator);

//   indicator.addEventListener("click", () => {
//     const hiddenCount = document.querySelectorAll(
//       '.feed-shared-update-v2[style*="display: none"]'
//     ).length;
//     const visibleCount = document.querySelectorAll(
//       '.feed-shared-update-v2:not([style*="display: none"])'
//     ).length;

//     alert(`LinkedIn Feed Filter Status:
//   - Showing posts from ${trustedUsers.length} trusted users
//   - Currently hidden posts: ${hiddenCount}
//   - Currently visible posts: ${visibleCount}
//   - Trusted users:\n${trustedUsers.join("\n")}`);
//   });
// };

// setTimeout(addStatusIndicator, 1500);

// LinkedIn Promotion and Suggested Content Filter
// This script only hides promotional/suggested content and keeps all regular user posts

const hidePromotedPosts = () => {
  console.log("Running hidePromotedPosts...");
  const posts = document.querySelectorAll(".feed-shared-update-v2");
  console.log(`Found ${posts.length} posts to check`);

  let hiddenCount = 0;

  posts.forEach((post) => {
    // Check if it's a promoted/suggested post
    if (isPromotedOrSuggested(post)) {
      post.style.display = "none";
      hiddenCount++;
    } else {
      // Ensure regular posts are visible (in case they were hidden before)
      post.style.display = "block";
    }
  });

  console.log(`Hidden ${hiddenCount} promotional or suggested posts`);

  // Update badge if it exists
  const badge = document.getElementById("linkedin-filter-badge");
  if (badge) {
    badge.textContent = `Hidden: ${hiddenCount}`;
  }
};

// Function to check if a post is promoted/sponsored/suggested
const isPromotedOrSuggested = (post) => {
  // 1. Check for text indicators in various places
  const checkElements = post.querySelectorAll("*");
  for (const el of checkElements) {
    if (!el.innerText) continue;

    const text = el.innerText.toLowerCase();
    if (
      text === "promoted" ||
      text === "sponsored" ||
      text.includes("suggested") ||
      text.includes("recommended") ||
      text === "ad" ||
      text.includes("you might be interested")
    ) {
      return true;
    }
  }

  // 2. Check for specific sponsored content attributes
  if (
    post.querySelector("[data-ad-id]") ||
    post.querySelector("[data-test-id='ad-component']") ||
    post.hasAttribute("data-ad-id") ||
    post.classList.contains("feed-shared-update--sponsored")
  ) {
    return true;
  }

  // 3. Check for suggested indicators in the header
  const headerTexts = Array.from(
    post.querySelectorAll(
      ".update-components-header__text-view, .feed-shared-actor__sub-description, .update-components-actor__sub-description"
    )
  );
  for (const element of headerTexts) {
    const text = element.innerText.toLowerCase();
    if (
      text.includes("promoted") ||
      text.includes("sponsored") ||
      text.includes("suggested") ||
      text.includes("recommended") ||
      text.includes("ad")
    ) {
      return true;
    }
  }

  // 4. Check for any data attributes that might indicate promotion
  const allElements = post.querySelectorAll("[data-id]");
  for (const el of allElements) {
    for (const attr of el.attributes) {
      if (
        (attr.name.startsWith("data-") || attr.name.startsWith("aria-")) &&
        (attr.value.includes("sponsor") ||
          attr.value.includes("promot") ||
          attr.value.includes("suggest") ||
          attr.value.includes("recommend") ||
          attr.value.includes("ad-"))
      ) {
        return true;
      }
    }
  }

  return false;
};

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const throttledHidePromotedPosts = throttle(hidePromotedPosts, 500);

const observeChanges = () => {
  if (!document.body) {
    setTimeout(observeChanges, 100);
    return;
  }

  console.log("Setting up MutationObserver...");

  // Use a MutationObserver to detect feed updates
  const observer = new MutationObserver((mutations) => {
    throttledHidePromotedPosts();
  });

  // Target the main feed container for more efficient observation
  const feedContainer =
    document.querySelector(".scaffold-finite-scroll__content") ||
    document.querySelector(".core-rail") ||
    document.querySelector("main") ||
    document.body;

  observer.observe(feedContainer, {
    childList: true,
    subtree: true,
  });

  // Initial run
  hidePromotedPosts();

  // Run several times during initialization to catch everything
  [500, 1000, 2000, 3000, 5000].forEach((delay) => {
    setTimeout(hidePromotedPosts, delay);
  });

  // Also run periodically to catch any missed updates
  setInterval(hidePromotedPosts, 3000);
};

// Add visual indicator that the script is running
const addStatusIndicator = () => {
  const container = document.createElement("div");
  container.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 120, 212, 0.9);
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 9999;
      cursor: pointer;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;

  const label = document.createElement("span");
  label.textContent = "LinkedIn Filter: ";

  const badge = document.createElement("span");
  badge.id = "linkedin-filter-badge";
  badge.textContent = "Active";
  badge.style.marginLeft = "5px";

  container.appendChild(label);
  container.appendChild(badge);
  document.body.appendChild(container);

  container.addEventListener("click", () => {
    hidePromotedPosts(); // Force refresh
    const hiddenCount = document.querySelectorAll(
      '.feed-shared-update-v2[style*="display: none"]'
    ).length;
    const visibleCount = document.querySelectorAll(
      '.feed-shared-update-v2:not([style*="display: none"])'
    ).length;

    alert(`LinkedIn Feed Filter:
  - Hiding all promotional & suggested content
  - Currently hidden posts: ${hiddenCount}
  - Currently visible posts: ${visibleCount}
  - Click this badge anytime to refresh the filter`);
  });
};

// Initialize the script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    observeChanges();
    setTimeout(addStatusIndicator, 1000);
  });
} else {
  observeChanges();
  setTimeout(addStatusIndicator, 1000);
}
