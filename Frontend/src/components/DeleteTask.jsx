
import React from "react";

export const DeleteTaskModal = ({ onDelete, onCancel, task }) => {
  if (!task) return null; // ✅ prevent error if somehow undefined

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-red-600 rounded-lg shadow-lg p-6 w-full max-w-sm text-white">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="mb-6">
          Do you really want to delete this task? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-white text-red-600 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(task.id)} // ✅ safe now
            className="px-4 py-2 rounded bg-black text-white font-semibold hover:bg-gray-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};