import type { Mapping } from "../App";

declare const chrome: any;

export const getMappings = (): Promise<Mapping[]> => {
  return new Promise((resolve) => {
    //@ts-ignore
    chrome.storage.sync.get("mappings", (res) => {
      resolve(res.mappings || []); // default to empty array
    });
  });
};
