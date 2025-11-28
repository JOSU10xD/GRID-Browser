# GRID Browser Frontend Documentation

## Overview
The frontend of GRID Browser is built using standard web technologies (HTML, CSS, JavaScript) running within an Electron environment. It is designed with a "cyber/neon" aesthetic, featuring a custom sidebar, frameless windows, and extensive use of CSS animations and gradients.

## Frontend Architecture
*   **Process:** Electron Renderer Process.
*   **Entry Point:** `index.html` (Main Window), `ghost.html` (Ghost Mode), `setup-init.html` (Setup Wizard).
*   **Logic:** `renderer.js` handles UI interactions, while `preload.js` provides a secure bridge to the Main process.
*   **Styling:** Vanilla CSS with CSS Variables for theming.
*   **Icons:** Feather Icons library.

---

## Main Interface (`index.html`)

The main browser window is divided into three primary sections:

1.  **Titlebar (`#titlebar`)**
    *   **Purpose:** Custom drag region and window controls (minimize, maximize, close).
    *   **Style:** Dark background, frameless integration.
    *   **Components:** App icon, title text, and window control buttons.

2.  **Sidebar (`#sidebar`)**
    *   **Purpose:** Primary navigation and control center.
    *   **Style:** Vertical layout on the left, customizable background color, neon border effect.
    *   **Components:**
        *   **Toolbar:** Back, Forward, Reload buttons.
        *   **Omnibox:** URL input field with glow effects.
        *   **Tab List:** Vertical list of open tabs (`#tabsSection`).
        *   **Bottom Controls:** Settings, New Tab, and Sidebar Toggle.

3.  **Webview Container (`#webview-container`)**
    *   **Purpose:** Hosts the actual web content.
    *   **Component:** Electron `<webview>` tag.
    *   **Behavior:** Resizes dynamically based on sidebar state (expanded/collapsed).

---

## Setup Wizard

The setup wizard is a multi-window flow that guides the user through initial configuration. It uses a consistent "Cyber Grid" background animation.

### Flow
1.  **Initialization (`setup-init.html`)**
    *   **Purpose:** Welcome screen.
    *   **Action:** "Initialize System" button starts the process.
    
2.  **User Creation (`setup-user.html`)**
    *   **Purpose:** Create a local user profile.
    *   **Input:** Username.
    *   **Logic:** Sends `register-user` IPC event to create folders.

3.  **UI Customization (`setup-ui.html`)**
    *   **Purpose:** Customize the look and feel.
    *   **Settings:**
        *   **Sidebar Color:** Color picker for the sidebar background.
        *   **Tab View Background:** Color picker for the tab area.
        *   **NTP Text Color:** Color picker for New Tab Page text.
    *   **Preview:** Live preview of the logo against the chosen colors.

4.  **General & Privacy (`setup-genaral.html`, `setup-privacy.html`)**
    *   **Purpose:** Configure search engine, privacy shields, and other behavior settings.

---

## Ghost Mode (`ghost.html`)

Ghost Mode is the private browsing experience. It shares the core architecture of the main window but with distinct visual cues.

*   **Visual Identity:**
    *   **Theme:** Violet/Purple gradient color scheme (distinct from the user's custom theme).
    *   **Sidebar:** Uses a violet-to-dark-violet gradient.
    *   **Titlebar:** Matches the violet theme.
*   **Functionality:**
    *   Operates in a separate session (no history saved to the main DB).
    *   "Ghost" icon indicator.

---

## Styling and Themes

The project relies heavily on CSS for its unique look.

### Key CSS Concepts
*   **Neon Glows:** Achieved using `box-shadow` and `text-shadow` with bright cyan/magenta colors.
    ```css
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    ```
*   **Gradients:** Linear gradients are used for buttons, backgrounds, and borders.
*   **Animations:**
    *   `@keyframes neonGlow`: Pulsing effect for borders.
    *   `@keyframes grid-pulse`: Background grid animation in setup pages.
    *   `transition`: Smooth hover effects on buttons and inputs.
*   **Glassmorphism:** `backdrop-filter: blur()` is used in flyout menus and setup panels to create a frosted glass effect.

---

## Renderer Logic (`renderer.js`)

This file contains the client-side logic for the main window.

### Key Responsibilities
1.  **IPC Communication:**
    *   Sends messages to `main.js` (e.g., `create-new-window`, `window-control`).
    *   Receives updates (e.g., `update-ui-settings`).
2.  **UI Interactivity:**
    *   Handles button clicks (Back, Forward, Refresh).
    *   Manages the "Flyout" menu toggling.
    *   Updates the UI based on user settings (applying colors).
3.  **Webview Management:**
    *   Injects CSS/JS into the webview (e.g., for custom scrollbars or dark mode).
    *   Listens for navigation events to update the URL bar.

### Example: Updating Username
```javascript
function updateUsername() {
  const userData = UserDataManager.getAllUserData();
  if (userData?.core) {
    document.querySelector('.username').textContent = userData.core.Username;
  }
}
```
