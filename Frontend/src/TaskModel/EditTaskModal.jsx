
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function EditTaskModal({ task, onSave, onClose, Theme }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignName, setAssignName] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Predefined assignees
  const assignees = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];

  // Prefill when modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setAssignName(task.AssignName || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...task,
      title,
      description,
      AssignName: assignName,
      dueDate,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {task && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* Overlay */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>

          {/* Modal Card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`relative w-80 md:w-96 p-5 rounded-lg shadow-lg z-10
              ${Theme ? "bg-gray-800 text-white" : "bg-white text-black"}
            `}
          >
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>

            {/* Title */}
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className={`border w-full p-2 rounded mb-3
                ${Theme ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}
              `}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />

            {/* Description */}
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className={`border w-full p-2 rounded mb-3
                ${Theme ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}
              `}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />

            {/* Assignee */}
            <label className="block text-sm font-medium mb-1">Assign To</label>
            <select
              value={assignName}
              onChange={(e) => setAssignName(e.target.value)}
              className={`border w-full p-2 rounded mb-3
                ${Theme ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}
              `}
            >
              <option value="">Select Assignee</option>
              {assignees.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {/* Due Date */}
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              className={`border w-full p-2 rounded mb-4
                ${Theme ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}
              `}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-3 py-1 rounded
                  ${Theme ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-black hover:bg-gray-300"}
                `}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-3 py-1 rounded
                  ${Theme ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-blue-600 text-white hover:bg-blue-500"}
                `}
              >
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditTaskModal;
