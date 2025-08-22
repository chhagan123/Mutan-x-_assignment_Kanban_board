import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        + Add Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      <div className="mt-4 flex-col">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-3 border h-auto w-40 flex  rounded-md shadow mb-2 bg-white"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Column: {task.column} | Feature: {task.feature} | Due:{" "}
              {task.dueDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
