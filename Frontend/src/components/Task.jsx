  import React from "react";
  import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
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
    className="p-4 border rounded-lg shadow-sm mb-3 bg-white cursor-pointer hover:shadow-md transition"
  >
    {/* Title */}
    <h3 className="font-semibold text-lg text-gray-800 mb-2">
      {task.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
      {task.description}
    </p>

    {/* Divider */}
    <div className="border-t pt-2">
      {/* Due Date */}
      <p className="text-xs text-gray-500">
        📅 <span className="font-medium">Due:</span> {task.dueDate}
      </p>
    </div>
  </div>
);
}

export default Task
