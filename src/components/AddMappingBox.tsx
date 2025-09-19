import { useState } from "react";

interface AddMappingBoxProps {
  onClose: () => void;
  onSubmit: (data: {
    shortcut: string;
    url: string;
    description: string;
  }) => void;
}

export default function AddMappingBox({
  onClose,
  onSubmit,
}: AddMappingBoxProps) {
  const [shortcut, setShortcut] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!shortcut.trim() || !url.trim()) return; // basic validation

    onSubmit({
      shortcut: shortcut.trim(),
      url: url.endsWith("/") ? url.slice(0, -1) : url,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-background border border-white/10 rounded-lg shadow-lg w-[400px] p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Add New Mapping</h2>

        {/* Shortcut */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Shortcut</label>
          <input
            type="text"
            value={shortcut}
            onChange={(e) => setShortcut(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md bg-foreground border border-white/10 focus:outline-none focus:ring-0"
            placeholder="e.g. lc"
          />
        </div>

        {/* URL */}
        <div className="mb-3">
          <label className="block text-sm mb-1">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md bg-foreground border border-white/10 focus:outline-none focus:ring-0"
            placeholder="https://leetcode.com"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md bg-foreground border border-white/10 focus:outline-none focus:ring-0"
            placeholder="LeetCode platform"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-600 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md bg-blue hover:bg-[#0faaaa] transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
