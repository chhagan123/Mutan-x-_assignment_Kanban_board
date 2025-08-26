import React, { useState } from "react";

export const AddColumn = ({ onClose, onSave ,Theme,columns}) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    const isDuplicate = columns.some(
      (col) => col.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
      alert("Column already registered Please make a new colum");
      return;
    }
    if (!title.trim()) return;
    onSave({ id: Date.now().toString(), title });
    alert("colum created successfully")
    setTitle("");
    onClose();
  };

  return (
    <div  className={`fixed inset-0 flex items-center justify-center z-50 
                      backdrop-blur-sm ${Theme ? "bg-black/60" : "bg-black/40"}`}>
      {/* Modal Box */}
      <div  className={`w-96 p-6 rounded-xl shadow-lg transition-all duration-300
                   ${Theme ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-black border border-gray-300"}`}>
        <h3 className="text-lg font-semibold mb-4">Add New Column</h3>

        <input
          type="text"
          placeholder="Column name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 transition-all duration-300
                               ${Theme 
                                   ? "bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500" 
                                   : "bg-white border border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"}`} 
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-all duration-300
                                    ${Theme 
                                        ? "bg-gray-600 text-white hover:bg-gray-500" 
                                         : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
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
