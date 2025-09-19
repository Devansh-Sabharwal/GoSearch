import { useState } from "react";
import type { Mapping } from "../App";
import { Edit2, Trash2 } from "lucide-react";

interface Entry {
  Mapping: Mapping;
  isEditing: Boolean;
  onSave: (editData: {
    shortcut: string;
    url: string;
    description: string;
  }) => void;
  onDelete: () => void;
  onCancel: () => void;
  onEdit: () => void;
}
export default function Entry({
  Mapping,
  isEditing,
  onSave,
  onDelete,
  onCancel,
  onEdit,
}: Entry) {
  const [editData, setEditData] = useState({
    shortcut: Mapping.shortcut,
    url: Mapping.url,
    description: Mapping.description,
  });
  const handleSave = () => {
    onSave(editData);
  };
  const shortcut = Mapping.shortcut;
  const url = Mapping.url;
  const description = Mapping.description;
  if (isEditing) {
    return (
      <tr>
        <td className="p-3">
          <input
            className="w-20 bg-gray-600 px-3 py-1 rounded-lg"
            type="text"
            onChange={(e) => {
              setEditData({ ...editData, shortcut: e.target.value });
            }}
            value={editData.shortcut}
          ></input>
        </td>
        <td className="p-3 text-sm max-w-[150px]">
          <input
            className="w-32 bg-gray-600 px-3 py-1 rounded-lg"
            type="url"
            onChange={(e) => {
              setEditData({ ...editData, url: e.target.value });
            }}
            value={editData.url}
          ></input>
        </td>
        <td className="p-3 text-sm max-w-[150px]">
          <input
            className="w-32 bg-gray-600 px-3 py-1 rounded-lg"
            type="text"
            onChange={(e) => {
              setEditData({ ...editData, description: e.target.value });
            }}
            value={editData.description}
          ></input>
        </td>
        <td className="px-5 py-4 text-right">
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="text-green-400 text-sm hover:text-green-300 p-1 font-medium"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-gray-400 text-sm hover:text-gray-300 p-1 font-medium"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        <div className="flex max-w-[150px] justify-center items-center">
          <span className="truncate px-3 py-1 font-medium bg-[#243547] text-sm text-blue rounded-2xl">
            {shortcut}
          </span>
        </div>
      </td>
      <td className="px-3 py-3 text-sm max-w-[150px]">
        <div
          onClick={() => {
            window.open(url, "_blank", "noopener,noreferrer");
          }}
          className="cursor-pointer truncate hover:underline hover:text-blue-400 transition-all duration-200"
        >
          {url}
        </div>
      </td>
      <td className="px-3 py-3 text-sm max-w-[150px]">
        <div className="truncate">{description}</div>
      </td>
      <td className="px-3 py-3">
        <div className="flex justify-end space-x-1">
          <button
            onClick={onEdit}
            className="p-2 cursor-pointer text-gray-500 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 cursor-pointer text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
