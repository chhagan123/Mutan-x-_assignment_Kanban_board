import React, { useState } from "react";

export const AddColumn = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ id: Date.now().toString(), title });
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm bg-opacity-30 bg-opacity-50  flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Column</h3>

        <input
          type="text"
          placeholder="Column name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
