const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const UserDataManager = require('./UserDataManager');

let mainWindow, setupWindow, splashWindow;
let unhideMethod = 'arrow'; // global value

// Checks if the core user file exists (indicating a registered user)
function userDataExists() {
  return fs.existsSync(UserDataManager.getUserCoreFilePath());
}

// Create Splash Window
function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 700,
    height: 600,
    frame: false,
    center: true,
    resizable: false,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  splashWindow.loadFile('splash.html');

  // Listen for splash-complete from splash.html
  ipcMain.once('splash-complete', () => {
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    // After splash is closed, decide next step
    if (userDataExists()) {
      createMainWindow();
    } else {
      createSetupWindow();
    }
  });
}

// Create Main Window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    icon: path.join(__dirname, 'assets', 'gridlogo.png'),
    backgroundMaterial: 'acrylic',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });

  mainWindow.loadFile('index.html');

  // Handle window controls from renderer
  ipcMain.on('window-control', (event, action) => {
    switch (action) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'toggle-fullscreen':
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
          mainWindow.setResizable(true);
          event.sender.send('window-state', 'restored');
        } else {
          mainWindow.setFullScreen(true);
          mainWindow.setResizable(false);
          event.sender.send('window-state', 'fullscreen');
        }
        break;
      case 'close':
        mainWindow.close();
        break;
    }
  });
}

// Create Setup Window
function createSetupWindow() {
  setupWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(__dirname, 'assets', 'gridlogo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the initial setup page
  setupWindow.loadFile('setup-init.html');

  // Navigate from splash to user registration
  ipcMain.on('navigate-setup-user', () => {
    setupWindow.loadFile('setup-user.html');
  });

  // Registration: create user folders and save user core data
  ipcMain.on('register-user', (event, username) => {
    UserDataManager.createUserFolders(username);
    UserDataManager.saveUserCore(username);
    // Then load the UI Settings page
    setupWindow.loadFile('setup-ui.html');
  });

  // Listen for updated UI settings from setup-ui.html.
  ipcMain.on('update-ui-settings', (event, uiSettings) => {
    try {
      let userCore = JSON.parse(fs.readFileSync(UserDataManager.getUserCoreFilePath(), 'utf8'));
      if (userCore && userCore.length > 0) {
        const username = userCore[0].Username;
        const userFolder = path.join(UserDataManager.UsersFolderPath, username);
        const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
        let currentSettings = {};

        if (fs.existsSync(settingsFilePath)) {
          currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }

        const updatedSettings = {
          ...currentSettings,
          ColorTool: uiSettings.colorTB,    // Sidebar/ToolBar color
          ColorTV: uiSettings.colorTV,      // TabView background
          NtpTextColor: uiSettings.ntpColorText // NTP text color
        };
        fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        console.log("UI settings updated for user:", username);
      }
    } catch (err) {
      console.error("Error updating UI settings:", err);
    }
  });

  ipcMain.on('update-general-settings', (event, genSettings) => {
    try {
      let userCore = JSON.parse(fs.readFileSync(UserDataManager.getUserCoreFilePath(), 'utf8'));
      if (userCore && userCore.length > 0) {
        const username = userCore[0].Username;
        const userFolder = path.join(UserDataManager.UsersFolderPath, username);
        const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
        let currentSettings = {};

        if (fs.existsSync(settingsFilePath)) {
          currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }

        const updatedSettings = {
          ...currentSettings,
          EngineFriendlyName: genSettings.engineFriendlyName,
          SearchUrl: genSettings.searchUrl,
          OpenTabHandel: genSettings.openTabHandle
        };
        fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        console.log("General settings updated for user:", username);
      }
    } catch (err) {
      console.error("Error updating general settings:", err);
    }
  });

  ipcMain.on('update-privacy-settings', (event, privacySettings) => {
    try {
      let userCore = JSON.parse(fs.readFileSync(UserDataManager.getUserCoreFilePath(), 'utf8'));
      if (userCore && userCore.length > 0) {
        const username = userCore[0].Username;
        const userFolder = path.join(UserDataManager.UsersFolderPath, username);
        const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
        let currentSettings = {};

        if (fs.existsSync(settingsFilePath)) {
          currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }

        const updatedSettings = {
          ...currentSettings,
          DisableJavaScript: privacySettings.DisableJavaScript,
          DisableGenAutoFill: privacySettings.DisableGenAutoFill,
          DisableWebMess: privacySettings.DisableWebMess,
          DisablePassSave: privacySettings.DisablePassSave
        };
        fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        console.log("Privacy settings updated for user:", username);
      }
    } catch (err) {
      console.error("Error updating privacy settings:", err);
    }
  });

  ipcMain.on('update-access-settings', (event, accessSettings) => {
    try {
      let userCore = JSON.parse(fs.readFileSync(UserDataManager.getUserCoreFilePath(), 'utf8'));
      if (userCore && userCore.length > 0) {
        const username = userCore[0].Username;
        const userFolder = path.join(UserDataManager.UsersFolderPath, username);
        const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
        let currentSettings = {};

        if (fs.existsSync(settingsFilePath)) {
          currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }

        const updatedSettings = {
          ...currentSettings,
          LightMode: accessSettings.lightMode,
          Lang: accessSettings.lang
        };
        fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        console.log("Access settings updated for user:", username);
      }
    } catch (err) {
      console.error("Error updating access settings:", err);
    }
  });

  ipcMain.on('update-webview-settings', (event, webviewSettings) => {
    try {
      let userCore = JSON.parse(fs.readFileSync(UserDataManager.getUserCoreFilePath(), 'utf8'));
      if (userCore && userCore.length > 0) {
        const username = userCore[0].Username;
        const userFolder = path.join(UserDataManager.UsersFolderPath, username);
        const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
        let currentSettings = {};

        if (fs.existsSync(settingsFilePath)) {
          currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }

        const updatedSettings = {
          ...currentSettings,
          StatusBar: webviewSettings.statusBar,
          BrowserKeys: webviewSettings.browserKeys,
          BrowserScripts: webviewSettings.browserScripts,
          Useragent: webviewSettings.userAgent
        };
        fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        console.log("WebView settings updated for user:", username);
      }
    } catch (err) {
      console.error("Error updating webview settings:", err);
    }
  });

  // When setup is done, we close it and show the splash again
  ipcMain.on('finish-setup', () => {
    if (setupWindow) {
      setupWindow.close();
      setupWindow = null;
    }
    // Show splash again; after splash is done, it will open main or setup
    createSplashWindow();
  });
}

// Listen for unhide method updates from the renderer
ipcMain.on('update-settings', (event, settings) => {
  if (settings.unhideMethod) {
    unhideMethod = settings.unhideMethod;
    // Broadcast new settings to the main window so its sidebar can update
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('settings-updated', { unhideMethod });
    }
    console.log("Unhide method updated to:", unhideMethod);
  }
});

// Start with the splash window
app.whenReady().then(() => {
  createSplashWindow();
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// On macOS, re-create a window if the dock icon is clicked and no other windows are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplashWindow();
  }
});
