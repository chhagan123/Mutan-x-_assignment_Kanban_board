import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Column({ id, title, children, Theme,onDelete }) {
  const { setNodeRef } = useDroppable({ id });
  const defaultCols = ["todo", "in-progress", "done"];
  const isDeletable = !defaultCols.includes(id);

  // Count tasks in this column (children length)
  const taskCount = React.Children.count(children);

  // Assign colors dynamically
  const colors = {
    Todo: "bg-purple-500",
    "In Progress": "bg-yellow-500",
    Done: "bg-green-500",
    cccc: "bg-purple-500",
    "new one": "bg-purple-500",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={`flex flex-col 
             
                 ${
                   Theme
                     ? "bg-gray-800 border border-purple-500/40 text-white"
                     : "bg-white border border-gray-300 text-black"
                 }
              
                 rounded-xl shadow-md 
                 min-h-auto w-auto flex-shrink-0`} // 👈 fixed width for slider
      >
        {/* Column header */}
        <div
          className={`flex justify-between rounded-md items-center px-4 py-2 
                    text-white font-semibold 
                    ${colors[title] || "bg-gray-500"}`}
        >
          <h2>{title}</h2>
          {isDeletable && (
          <button
            onClick={onDelete}
            className="text-xs bg-red-500 px-2 py-1 rounded hover:bg-red-600"
          >
            Delete colum
          </button>)}
          <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
            {taskCount - 1}
          </span>
        </div>

        {/* Tasks */}
        <div className="flex-1 p-3 space-y-3 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

export default Column;
