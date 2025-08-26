import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Column({ id, title, children,Theme }) {
  const { setNodeRef } = useDroppable({ id });

  // Count tasks in this column (children length)
  const taskCount = React.Children.count(children);

  // Assign colors dynamically
  const colors = {
    Todo: "bg-red-500",
    "In Progress": "bg-yellow-500",
    Done: "bg-green-500",
    cccc: "bg-blue-500",
    "new one": "bg-purple-500",
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col 
                 hover:shadow-xl rounded-5xl hover:scale-[0.97] transition-all duration-300  
                 ${Theme 
                  ? "bg-gray-800 border border-purple-500/40 text-white" 
                  : "bg-white border border-gray-300 text-black"}
              
                 rounded-xl shadow-md 
                 min-h-[500px] w-[300px] flex-shrink-0`} // 👈 fixed width for slider
    >
      {/* Column header */}
      <div
        className={`flex justify-between rounded-md items-center px-4 py-2 
                    text-white font-semibold 
                    ${colors[title] || "bg-gray-500"}`}
      >
        <h2>{title}</h2>
        <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
          {taskCount - 1}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Column;
