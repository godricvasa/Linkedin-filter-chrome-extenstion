# SiteMan Chrome Extension

<!-- # YouTube demo video: https://youtu.be/1jJV2YvabxM?feature=shared -->

- SiteMan is a Chrome extension that allows users to block websites of their choice by maintaining a blocklist. When a blocked website is accessed, the extension redirects the user to a custom `blocked.html` page and optionally shows an alert.

- It can also filter out the promotional posts in linkedin feed [NEW FEATURE ADDED]

## Features

- Block websites by adding them to the blocklist.
- Redirect blocked websites to a custom `blocked.html` page.
- Optional alert message when accessing blocked websites.

## Installation

To use the SiteMan Chrome extension on your machine, follow these steps:

1. ### Clone the Repository:

   ```bash
   git clone https://godricvasa-admin@bitbucket.org/godricvasa/siteman.git
   cd siteman
   ```

2. ### Install Dependencies\*\*:

   ```bash
    npm install
   ```

3. ### Build the Extension:

   ```bash
   npm run build
   ```

## Load the Extension in Chrome:

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click on "Load unpacked".
4. Select the `build` directory within the cloned repository.
