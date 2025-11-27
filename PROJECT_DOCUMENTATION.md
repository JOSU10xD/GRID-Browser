# GRID Browser Project Documentation
Last updated: 2025-11-27

## Table of Contents
1. [Summary](#summary)
2. [Architecture](#architecture)
3. [File Walkthrough](#file-walkthrough)
4. [Key Functions](#key-functions)
5. [Dependencies](#dependencies)
6. [Setup & Run](#setup--run)
7. [Teaching Tutorial](#teaching-tutorial)
8. [Demo Script](#demo-script)
9. [FAQ & Troubleshooting](#faq--troubleshooting)
10. [Security & Privacy](#security--privacy)
11. [Improvements & Roadmap](#improvements--roadmap)
12. [Contributing Guide](#contributing-guide)
13. [Codebase Map](#codebase-map)

---

## Summary

GRID Browser is a modern, customizable web browser built on Electron that features a unique sidebar-based user interface inspired by Zen Browser. It offers a "cyber" aesthetic with neon accents, customizable themes, and privacy-focused features like a "Ghost Mode" for private browsing.

**Elevator Pitch:** A highly customizable, privacy-centric browser with a futuristic UI that puts you in control of your web experience.

**Main Value Points:**
*   **Unique UI:** Vertical sidebar navigation with customizable colors and "neon" aesthetics.
*   **Privacy First:** Built-in "Ghost Mode" and settings to disable trackers/scripts.
*   **User Control:** Extensive customization of the interface and browser behavior through a dedicated setup flow.

---

## Architecture

### Tech Stack
*   **Runtime:** Node.js (via Electron)
*   **Framework:** Electron (v35.0.2)
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Database:** SQLite3 (for history), JSON (for user settings)
*   **Icons:** Feather Icons
*   **3D Graphics:** Three.js (included in dependencies)

### Block Diagram
```
+-------------------------------------------------------+
|                   Electron Main Process               |
|  (main.js)                                            |
|  - Window Management (Main, Setup, Splash, Ghost)     |
|  - IPC Handling (Communication with Renderer)         |
|  - File System Access (fs)                            |
|  - Database Access (sqlite3)                          |
+---------------------------+---------------------------+
                            |
            IPC (Inter-Process Communication)
                            |
+---------------------------+---------------------------+
|                 Electron Renderer Process             |
|  (index.html, renderer.js, preload.js)                |
|  - User Interface (Sidebar, Tabs, Settings)           |
|  - Webview (<webview> tag for browsing)               |
|  - User Interaction Handling                          |
+-------------------------------------------------------+
```

### Data Flow (User Setup)
1.  **Launch:** App starts -> `main.js` checks for user data.
2.  **Check:** If no data -> Opens `setup-init.html`.
3.  **Input:** User enters username in `setup-user.html`.
4.  **Process:** `ipcMain` receives 'register-user' -> Calls `UserDataManager.createUserFolders`.
5.  **Storage:** Creates folders in `AppData/GRIDBrowser/Users/[Username]` and saves `UserCore.json`.
6.  **Transition:** Setup completes -> Main window opens with user profile loaded.

### Deployment
*   **Target:** Desktop Application (Windows, macOS, Linux).
*   **Packaging:** Uses `electron-builder` to create installers (e.g., NSIS for Windows).

---

## File Walkthrough

### Root Directory
*   `main.js`: **Entry Point.** The main process file that manages application lifecycle, windows, and IPC events.
*   `renderer.js`: **UI Logic.** Handles frontend interactions in the main browser window (sidebar, buttons).
*   `preload.js`: **Bridge.** Securely exposes specific Main process capabilities to the Renderer process.
*   `UserDataManager.js`: **Data Handler.** Manages user profile creation, folder structure, and settings retrieval.
*   `HistoryManager.js`: **History Handler.** Helper module for interacting with the SQLite history database.
*   `index.html`: **Main UI.** The primary browser interface containing the sidebar and the `<webview>`.
*   `package.json`: **Config.** Project metadata, scripts, and dependencies.

### Setup Files
*   `setup-init.html`: Initial welcome screen for the setup wizard.
*   `setup-user.html`: Screen for creating a new user profile.
*   `setup-ui.html`, `setup-privacy.html`, etc.: Subsequent steps in the setup wizard for customizing the browser.

### Assets
*   `assets/`: Contains images (logos, backgrounds) and icons used in the UI.

---

## Key Functions

### 1. `createMainWindow()`
*   **File:** `main.js` (Lines 41-80)
*   **Purpose:** Creates the primary browser window.
*   **Details:** Configures window size, frame (frameless), and web preferences (nodeIntegration, webviewTag). Loads `index.html`.
*   **Example:** Called automatically after splash screen if user data exists.

### 2. `UserDataManager.createUserFolders(username)`
*   **File:** `UserDataManager.js` (Lines 12-59)
*   **Purpose:** Sets up the file system structure for a new user.
*   **Details:** Creates directories: `Users/[username]`, `Settings`, `Database`, `Browser`. Creates default `settings.json`.
*   **Example:** `createUserFolders("Nevil")` -> Creates `.../Users/Nevil/...`

### 3. `ipcMain.on('register-user')`
*   **File:** `main.js` (Lines 102-109)
*   **Purpose:** Handles the user registration event from the setup wizard.
*   **Details:** Calls `UserDataManager` to create folders and save core user data, then navigates to the next setup screen.
*   **Example:** Triggered when user clicks "Activate Profile" in `setup-user.html`.

### 4. `initHistoryDatabase()`
*   **File:** `main.js` (Lines 513-541)
*   **Purpose:** Initializes the SQLite database for browsing history.
*   **Details:** Opens/Creates `history.db` in the user's database folder and ensures the `history` table exists.
*   **Example:** Called when the main window finishes loading.

### 5. `ipcMain.handle('take-screenshot')`
*   **File:** `main.js` (Lines 600-636)
*   **Purpose:** Captures a screenshot of a specific webview.
*   **Details:** Uses `webContents.capturePage()` to generate an image and saves it to the Downloads folder.
*   **Example:** Invoked via `window.captureScreenshot()` in the renderer.

---

## Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `electron` | 35.0.2 | The framework for building the desktop app. |
| `electron-builder` | ^26.0.12 | Tool for packaging and building the app for distribution. |
| `sqlite3` | ^5.1.7 | Database engine for storing browser history. |
| `feather-icons` | ^4.29.2 | Library for the UI icons (home, settings, etc.). |
| `three` | ^0.174.0 | 3D library (likely for visual effects, though usage needs verification). |

---

## Setup & Run

### Prerequisites
*   Node.js (v16 or higher recommended)
*   npm (usually comes with Node.js)

### Installation
1.  **Clone/Download** the repository to your local machine.
2.  Open a terminal in the project root folder.
3.  Run the following command to install dependencies:
    ```bash
    npm install
    ```
    *Note: This may take a few minutes as it downloads Electron binaries.*

### Running Locally
To start the application in development mode:
```bash
npm start
```

### Building for Production
To create a distributable installer (e.g., .exe for Windows):
```bash
npm run dist
```
The output will be in the `dist/` folder.

---

## Teaching Tutorial

### Lesson 1: Introduction to Electron
*   **Objective:** Understand the Main vs. Renderer process architecture.
*   **Task:** Read `main.js` and `index.html`. Identify where the window is created and where the UI is defined.
*   **Exercise:** Change the default window width in `main.js` from 1200 to 800 and restart the app.

### Lesson 2: Customizing the UI
*   **Objective:** Learn how to style Electron apps with CSS.
*   **Task:** Open `index.html` and locate the `#sidebar` styles.
*   **Exercise:** Change the sidebar background color or the neon border color.

### Lesson 3: IPC Communication
*   **Objective:** Understand how the frontend talks to the backend.
*   **Task:** Trace the `create-new-window` event from `renderer.js` to `main.js`.
*   **Exercise:** Add a new button in `index.html` that sends a "hello" message to the main process, and log it in the terminal.

### Lesson 4: Data Persistence
*   **Objective:** Learn how to save user data.
*   **Task:** Examine `UserDataManager.js`.
*   **Exercise:** Add a new field to the default settings object (e.g., `"Theme": "Dark"`) and verify it appears in the generated `settings.json` after a fresh setup.

### Lesson 5: Building the App
*   **Objective:** Package the app for distribution.
*   **Task:** Run `npm run dist`.
*   **Exercise:** Install the generated application on your machine and verify it runs independently of the terminal.

---

## Demo Script

**Duration:** 5 Minutes

1.  **Intro (1 min):** "Hi, this is GRID Browser. It's designed for privacy and customization."
2.  **Launch & Setup (1.5 min):**
    *   Start the app (clean state).
    *   Show the "Welcome" splash screen.
    *   Walk through the Setup Wizard: Enter a name ("DemoUser"), pick a color theme.
    *   Explain how this creates a personalized profile on the disk.
3.  **Main UI (1.5 min):**
    *   Show the main window. Point out the vertical sidebar.
    *   Demonstrate the "Neon" aesthetic.
    *   Open a tab (e.g., Google) to show the `<webview>` working.
    *   Open the "Flyout" menu to show user details.
4.  **Ghost Mode (1 min):**
    *   Click "New Private Window" (Ghost Mode).
    *   Explain that this window doesn't save history.
    *   Close the app.

---

## FAQ & Troubleshooting

**Q: The app shows a white screen on launch.**
*   **Fix:** Check the terminal for errors. Ensure `index.html` path is correct in `main.js`.

**Q: "sqlite3" module not found error.**
*   **Fix:** You may need to rebuild sqlite3 for Electron. Run: `npm install sqlite3 --build-from-source --runtime=electron --target=35.0.2 --dist-url=https://electronjs.org/headers` (adjust target version to match your Electron version).

**Q: Changes to CSS aren't showing up.**
*   **Fix:** Electron caches resources. Use `Ctrl+R` (or `Cmd+R`) to reload the window, or restart the `npm start` process.

**Q: Setup wizard keeps appearing.**
*   **Fix:** The app checks for `UserCore.json`. If it's missing or invalid, setup runs. Check `UserDataManager.js` logic.

---

## Security & Privacy

*   **Context Isolation:** Currently `contextIsolation: false` is used in some windows.
    *   **Risk:** Renderer process has full Node.js access.
    *   **Mitigation:** Enable `contextIsolation: true` and use `preload.js` for all IPC.
*   **Webview Tag:** The `<webview>` tag is used.
    *   **Recommendation:** Ensure `allowpopups` is managed and `nodeIntegration` is disabled inside the webview (it is by default).
*   **Data Storage:** User data is stored in plain JSON.
    *   **Recommendation:** Avoid storing sensitive passwords in plain text. Use Electron's `safeStorage` API for encryption.

---

## Improvements & Roadmap

1.  **High Priority:** Enable `contextIsolation` globally for better security.
2.  **High Priority:** Implement a proper settings UI within the main browser (currently handled mostly in setup).
3.  **Medium:** Add tab grouping or vertical tab management.
4.  **Medium:** Improve the "Ghost Mode" to automatically clear cookies/cache on exit.
5.  **Low:** Add support for Chrome Extensions.
6.  **Low:** Implement cloud sync for user settings.
7.  **Low:** Add more themes and visual customizability.
8.  **Strategic:** Port the rendering engine to a more performant solution if webview becomes a bottleneck.

---

## Contributing Guide

1.  **Fork** the repo.
2.  **Branch** for your feature (`git checkout -b feature/amazing-feature`).
3.  **Commit** your changes (`git commit -m 'Add amazing feature'`).
4.  **Push** to the branch (`git push origin feature/amazing-feature`).
5.  **Open a Pull Request**.

**Style Guide:**
*   Use 2 spaces for indentation.
*   Keep functions small and focused.
*   Comment complex logic, especially in `main.js`.

---

## Codebase Map

```json
{
  "core": {
    "entry": "main.js",
    "data": "UserDataManager.js",
    "history": "HistoryManager.js"
  },
  "ui": {
    "main": "index.html",
    "logic": "renderer.js",
    "styles": "index.html (embedded css)"
  },
  "setup": {
    "init": "setup-init.html",
    "user": "setup-user.html",
    "config": "setup-ui.html"
  },
  "assets": "assets/"
}
```
