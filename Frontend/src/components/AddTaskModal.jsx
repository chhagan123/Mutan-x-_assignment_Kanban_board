import React, { useState } from "react";

export default function AddTaskModal({ onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState("To Do");
  // const [feature, setFeature] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [columnValue, setColumnValue] = useState("todo");
//   const  [projectName,setprojectname] = useState [[]];


  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([...checklist, newChecklistItem.trim()]);
      setNewChecklistItem("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert("Please enter a title");
    const newTask = { 
        id: Date.now().toString(), 
        title, 
        description, 
       
        
        column: columnValue.toLowerCase().replace(" ", "-") // ✅ normalized
      }  // normalize, feature, dueDate, checklist };
    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Column Selector */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Column</label>
          <select
               value={columnValue}
            onChange={(e) => setColumnValue(e.target.value)}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Feature Selector */}
      

        {/* Due Date */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Checklist */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Checklist</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Add checklist item"
              className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddChecklistItem}
              className="px-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              +
            </button>
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
            {checklist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
