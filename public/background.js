chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get("mappings", (res) => {
    const mappings = res.mappings || [];
    const shortcut = text.trim();
    const [base, ...rest] = shortcut.split("/");
    console.log(shortcut);
    // find mapping by shortcut
    const mapping = mappings.find((m) => m.shortcut === base);
    if (mapping) {
    console.log("mapping found")

      const extraPath = rest.length > 0 ? "/" + rest.join("/") : "";
      chrome.tabs.create({ url: mapping.url + extraPath });
    } else {
      // fallback to Google search
      console.log("mapping not found")
      chrome.tabs.create({
        url:
          "https://www.google.com/search?q=" +
          encodeURIComponent(shortcut),
      });
    }
  });
});
