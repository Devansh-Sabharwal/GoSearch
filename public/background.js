chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get("mappings", (res) => {
    const mappings = res.mappings || {};
    const shortcut = text.trim();
    const [base, ...rest] = shortcut.split("/");
    const baseUrl = mappings[base];

    if (baseUrl) {
      const extraPath = rest.length > 0 ? "/" + rest.join("/") : "";
      chrome.tabs.create({ url: baseUrl + extraPath });
    } else {
      // fallback to Google search
      chrome.tabs.create({ url: "https://www.google.com/search?q=" + encodeURIComponent(shortcut) });
    }
  });
});
