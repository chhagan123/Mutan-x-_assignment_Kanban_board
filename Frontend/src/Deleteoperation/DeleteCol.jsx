import React from "react";

 function DeleteCol({ onCancel, handleDeleteCol, deletecolid }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-lg font-bold mb-4">Delete Column</h2>
        <p className="mb-6">Are you sure you want to delete this column?</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDeleteCol(deletecolid)} // 👈 confirm delete
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteCol