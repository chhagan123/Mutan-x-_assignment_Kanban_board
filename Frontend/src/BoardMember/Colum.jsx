import { AlignHorizontalDistributeCenterIcon } from "lucide-react";
import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";


function Column({ id, title, children }) {
  const { setNodeRef } = useDroppable({ id });

  // Count tasks in this column (children length)
  const taskCount = React.Children.count(children);

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-gray-100 rounded shadow min-h-[200px]"
    >
      {/* Column header with count */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold">{title}</h2>
        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded-full">
  {taskCount - 1}
</span>
      </div>

      {children}
    </div>
  );
}

export default Column
