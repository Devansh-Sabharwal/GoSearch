# GoSearch 🚀

GoSearch is a lightweight Chrome extension that lets you create shortcuts for your favorite websites.
Just type `go your-shortcut` in the address bar and you’ll be instantly redirected — no long URLs, no clutter.

---

## 🔧 Setup & Installation

1. Clone this repository

   ```bash
   git clone https://github.com/yourusername/gosearch.git
   cd gosearch
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build the extension

   ```bash
   npm run build
   ```

4. Load the extension in your browser

   - Open **chrome://extensions/** (or **brave://extensions/**).
   - Enable **Developer mode** (top-right).
   - Click **Load unpacked** and select the `dist/` folder created after the build.

---

## ✨ Features

- Define your own shortcuts → `go yt` → YouTube opens 🎬
- Works directly from the address bar (Omnibox).
- Manage shortcuts with a clean popup UI (add, edit, delete).
- Stores data securely in Chrome Sync Storage.

---

## 📌 Notes

- The default keyword is `go` → type it in the address bar to trigger GoSearch.
- Works best on Chromium-based browsers (Chrome, Brave, Edge).
