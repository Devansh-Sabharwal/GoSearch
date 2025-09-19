import { useState } from "react";
import type { Mapping } from "../App";
import { Trash } from "lucide-react";

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
        <td>
          <input
            type="text"
            onChange={(e) => {
              setEditData({ ...editData, shortcut: e.target.value });
            }}
            value={shortcut}
          ></input>
        </td>
        <td>
          <input
            type="url"
            onChange={(e) => {
              setEditData({ ...editData, url: e.target.value });
            }}
            value={url}
          ></input>
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setEditData({ ...editData, description: e.target.value });
            }}
            value={description}
          ></input>
        </td>
        <td>
          <div className="flex gap-3">
            <span onClick={handleSave}>Save</span>
            <span onClick={onCancel}>Cancel</span>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        <div>{shortcut}</div>
      </td>
      <td>
        <div>{url}</div>
      </td>
      <td>
        <div>{description}</div>
      </td>
      <td>
        <div className="flex gap-4">
          <span onClick={onEdit}>Edit</span>
          <span className="stroke-red-500" onClick={onDelete}>
            <Trash />
          </span>
        </div>
      </td>
    </tr>
  );
}
