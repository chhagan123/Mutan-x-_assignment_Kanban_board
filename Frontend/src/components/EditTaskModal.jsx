import { useState, useEffect } from "react";
import React from "react";

function EditTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignName, setAssignName] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Pre-fill input when modal opens
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
      AssignName: assignName, // ✅ use correct property
      dueDate,                // ✅ use correct property
    });

    onClose();
  };

  if (!task) return null; // don't render if no task selected

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black/40 backdrop-blur-sm bg-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md shadow-md w-80"
      >
        <h2 className="text-lg font-bold mb-3">Edit Task</h2>

        {/* Title */}
        <label>Title</label>
        <input
          className="border w-full p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          className="border w-full p-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />

        {/* Assign Name */}
        <label>User</label>
        <input
          className="border w-full p-2 rounded mb-3"
          value={assignName}
          onChange={(e) => setAssignName(e.target.value)}
          placeholder="Assign to"
        />

        {/* Due Date */}
        <label>Due Date</label>
        <input
          type="date"
          className="border w-full p-2 rounded mb-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;
