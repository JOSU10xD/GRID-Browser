const path = require('path');
const fs = require('fs');

// Define a core folder for your app.
// On Windows, process.env.APPDATA is typically used; on macOS/Linux, process.env.HOME is used.
const coreFolderPath = path.join(process.env.APPDATA || process.env.HOME || __dirname, 'GRIDBrowser');
const usersFolderPath = path.join(coreFolderPath, 'Users');
const userCoreFileName = 'UserCore.json';

function getUserCoreFilePath() {
  return path.join(coreFolderPath, userCoreFileName);
}

function createUserFolders(username) {
  // Ensure core folder exists.
  if (!fs.existsSync(coreFolderPath)) fs.mkdirSync(coreFolderPath);
  // Ensure Users folder exists.
  if (!fs.existsSync(usersFolderPath)) fs.mkdirSync(usersFolderPath);

  // Create a folder for this user (folder name is the username entered)
  const userFolder = path.join(usersFolderPath, username);
  if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);

  // Create subfolders.
  ['Settings', 'Database', 'Browser', 'Modules'].forEach(subfolder => {
    const folderPath = path.join(userFolder, subfolder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

  // Create default settings file if it doesn't exist.
  const settingsFilePath = path.join(userFolder, 'Settings', 'settings.json');
  if (!fs.existsSync(settingsFilePath)) {
    const defaultSettings = {
      DisableJavaScript: "0",
      DisablePassSave: "0",
      DisableWebMess: "0",
      DisableGenAutoFill: "0",
      ColorBackground: "#000000",
      StatusBar: "1",
      BrowserKeys: "1",
      BrowserScripts: "1",
      Useragent: "WebView",
      LightMode: "0",
      OpSw: "1",
      EngineFriendlyName: "Google",
      SearchUrl: "https://www.google.com/search?q=",
      ColorTool: "#000000",
      ColorTV: "#000000",
      Background: "1",
      Auto: "0",
      Lang: "en-US",
      ReadButton: "1",
      AdblockBtn: "1",
      Downloads: "1",
      Translate: "1",
      Favorites: "1",
      Historybtn: "1",
      QrCode: "1",
      FavoritesL: "1",
      ToolIcon: "1",
      DarkIcon: "1",
      OpenTabHandel: "0",
      NtpDateTime: "0",
      ExitDialog: "0",
      NtpTextColor: "#000000"
    };
    fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
  }
}

function saveUserCore(username) {
  const userCoreFilePath = getUserCoreFilePath();
  // Save a basic JSON array with one user object.
  const userData = [{ Username: username }];
  fs.writeFileSync(userCoreFilePath, JSON.stringify(userData, null, 2));
}

module.exports = {
  getUserCoreFilePath,
  createUserFolders,
  saveUserCore,
  CoreFolderPath: coreFolderPath,
  UsersFolderPath: usersFolderPath
};
