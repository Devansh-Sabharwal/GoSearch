chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get("mappings", (res) => {
    const mappings = res.mappings || [];
    const shortcut = text.trim();
    const [base, ...rest] = shortcut.split("/");
    
    // find mapping by shortcut
    const mapping = mappings.find((m) => m.shortcut === base);
    if (mapping) {
  
      const extraPath = rest.length > 0 ? "/" + rest.join("/") : "";
      // Ensure protocol
      let finalUrl = mapping.url + extraPath;
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = "https://" + finalUrl;
      }

      chrome.tabs.create({ url: finalUrl });
      // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //   if (tabs[0]?.id) {
      //     chrome.tabs.update(tabs[0].id, { url: finalUrl });
      //   }
      // });
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
