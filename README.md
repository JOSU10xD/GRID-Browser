# 🔳 GRID Browser

![GRID Browser Banner](./assets/grid-banner.png)

## 🚀 Overview

**GRID Browser** is a lightweight, customizable desktop browser built with **Electron**, **HTML**, **CSS**, and **JavaScript**. It features a minimal UI, a built-in settings page, and a custom home screen—perfect for learning how to build a Chromium-powered shell or as a foundation for your own browser project.

---

## 📸 Screenshots

<!-- Replace these with your 4–5 images -->

![Home Page](./assets/homepage.png)
![Main View](./assets/index.png)
![Settings](./assets/settings.png)
![Context Menu](./assets/context-menu.png)

---

## 🏗️ Tech Stack

* **[Electron](https://www.electronjs.org/)** – Cross-platform desktop runtime
* **HTML5 & CSS3** – Markup and styling
* **Vanilla JavaScript** – Browser logic and event handling
* **Node.js** – Backend support for file and settings management

---

## 🔥 Features

### ✅ Core Features

* **Tabbed Browsing** – Open multiple pages in separate tabs
* **Custom Homepage** – Configurable start page via `homepage.html`
* **Settings Panel** – Manage preferences (theme, default URL) in `settings.html`
* **Navigation Controls** – Back/Forward, Reload, and Address Bar
* **Lightweight** – Minimal dependencies for fast startup

### 🛠️ Planned Enhancements

* **Download Manager** – Handle file downloads natively
* **Bookmark System** – Save and organize favorite sites
* **History Viewer** – Browse and clear past visits
* **Extension Support** – Experiment with simple plugin APIs
* **Privacy Mode** – Incognito browsing without data persistence

---

## 🛠️ Installation & Running

1. **Clone the repo**

   ```sh
   git clone https://github.com/JOSU10xD/GRID-Browser.git
   cd GRID-Browser
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Run the app**

   ```sh
   npm start
   ```

---

## 📂 Project Structure

```bash
GRID-Browser/
│── assets/             # Images and icons
│   ├── grid-banner.png       # README banner
│   ├── homepage.png          # Screenshot placeholders
│   └── …  
│── index.html           # Main browser UI
│── homepage.html        # Customizable start page
│── settings.html        # Preferences panel
│── main.js              # Electron main process
│── renderer.js          # Front-end logic (if used)
│── package.json         # Project manifest & scripts
└── .gitignore
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m "Add awesome feature"`)
4. Push to your fork (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE.txt) for details.
