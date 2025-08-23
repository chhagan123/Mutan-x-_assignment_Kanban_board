
import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active) {
      const updatedTasks = tasks.map((task) =>
        task.title === active.id ? { ...task, column: over.id } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const getTasksByColumn = (columnName) =>
    tasks.filter((task) => task.column === columnName);

  return (
    <DndContext onDragEnd={handleDragEnd}>
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

      {/* Kanban Columns */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Column id="todo" title="📝 Todo">
          {getTasksByColumn("todo").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>

        <Column id="in-progress" title="⚡ In Progress">
          {getTasksByColumn("in-progress").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>

        <Column id="done" title="✅ Done">
          {getTasksByColumn("done").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>
      </div>
    </DndContext>
  );
}

/* ----------- Reusable Column Component ----------- */
function Column({ id, title, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 bg-gray-100 rounded shadow min-h-[200px]">
      <h2 className="font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}

/* ----------- Reusable Task Component ----------- */
function Task({ id, task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 border rounded-md shadow mb-2 bg-white cursor-pointer"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-500 mt-1">
        Feature: {task.feature} | Due: {task.dueDate}
      </p>
    </div>
  );
}
