


import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddTaskModal({ onClose, onAddTask, modalType, Theme }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [AssignName, SetAssignName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const columnValue = modalType;

  const assignees = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];

  const handleSubmit = () => {
    if (!title.trim()) return alert("Please enter a title");
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      AssignName,
      dueDate,
      column: (columnValue || "todo").toLowerCase().replace(" ", "-"),
    };
    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`rounded-2xl shadow-lg p-6 w-full max-w-md transition-colors duration-300 
          ${Theme ? "bg-gray-900 text-white border border-gray-700":"bg-white text-gray-900" }
        `}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-xl font-bold mb-4 tracking-wide 
            ${Theme ? "text-pink-400 drop-shadow-lg":"text-gray-900" }
          `}
        >
          ✨ Add New Task
        </motion.h2>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={`w-full border rounded-md p-2 focus:ring-2 transition-all duration-200
              ${Theme
                ? "bg-gray-800 border-gray-600 focus:ring-pink-500":"bg-gray-100 border-gray-300 focus:ring-indigo-500"
                }
            `}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className={`w-full border rounded-md p-2 focus:ring-2 transition-all duration-200
              ${Theme
                ?"bg-gray-800 border-gray-600 focus:ring-pink-500": "bg-gray-100 border-gray-300 focus:ring-indigo-500"
                }
            `}
          />
        </div>

        {/* Assignee */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Assign To</label>
          <select
            value={AssignName}
            onChange={(e) => SetAssignName(e.target.value)}
            className={`w-full border rounded-md p-2 transition-all duration-200
              ${Theme
                ? 
                  "bg-gray-800 border-gray-600 text-white focus:ring-pink-500":"bg-gray-100 border-gray-300 text-black focus:ring-indigo-500" }
            `}
          >
            <option value="">Select Assignee</option>
            {assignees.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Column Hidden */}
        <input type="hidden" value={columnValue || ""} readOnly />

        {/* Due Date */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full border rounded-md p-2 focus:ring-2 transition-all duration-200
              ${Theme
                ? 
                 "bg-gray-800 border-gray-600 focus:ring-pink-500" : "bg-gray-100 border-gray-300 focus:ring-indigo-500"}
            `}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-200
              ${Theme
                ? "bg-gray-200 hover:bg-gray-300 text-black"
                : "bg-gray-700 hover:bg-gray-600 text-white"}
            `}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-200
              ${Theme
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-500/40"}
            `}
          >
            Add Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}
