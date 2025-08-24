

import React from "react";
import { DndContext } from "@dnd-kit/core";
import Task from "../BoardMember/Task";
import Column from "../BoardMember/Colum";

export default function Board({
  tasks,
  setTasks,
  setShowModal,
  setModalType,
}) {
  // ✅ Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // dropped outside a column

    // Update the column of the dragged task
    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, column: over.id } : task
      )
    );
  };

  // ✅ Group tasks by column
  const getTasksByColumn = (col) => tasks.filter((t) => t.column === col);

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {/* TODO Column */}
          <Column id="todo" title="📝 Todo">
            {getTasksByColumn("todo").map((task) => (
              <Task key={task.id} id={task.id} task={task} />
            ))}
            <button
              onClick={() => {
                setModalType("todo");
                setShowModal(true);
              }}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              + Add Task
            </button>
          </Column>

          {/* In Progress Column */}
          <Column id="in-progress" title="⚡ In Progress">
            {getTasksByColumn("in-progress").map((task) => (
              <Task key={task.id} id={task.id} task={task} />
            ))}
            <button
              onClick={() => {
                setModalType("in-progress");
                setShowModal(true);
              }}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              + Add Task
            </button>
          </Column>

          {/* Done Column */}
          <Column id="done" title="✅ Done">
            {getTasksByColumn("done").map((task) => (
              <Task key={task.id} id={task.id} task={task} />
            ))}
            <button
              onClick={() => {
                setModalType("done");
                setShowModal(true);
              }}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              + Add Task
            </button>
          </Column>
        </div>
      </DndContext>
    </div>
  );
}
