import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Edit, Trash2, User, Calendar } from "lucide-react"; // ✅ icon set

function Task({ id, task ,handleDelete,onEdit}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

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
      className="w-full h-40 p-3 border rounded-xl shadow-sm mb-3 bg-white cursor-pointer 
                 hover:shadow-md transition flex flex-col justify-between"
    >
      {/* Top Row (Title + Actions) */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-sm text-gray-800 truncate">
          {task.title}
        </h3>
        <div className="flex gap-2 text-gray-500">
        <button
  onClick={() => onEdit(task)}
  className="p-1 rounded hover:bg-indigo-100 active:scale-95 transition"
>
  <Edit size={16} className="text-indigo-600" />
</button>

<button
  onClick={() => handleDelete(task.id)}
  className="p-1 rounded hover:bg-red-100 active:scale-95 transition"
>
  <Trash2 size={16} className="text-red-600" />
</button>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 line-clamp-2 overflow-hidden text-ellipsis mb-2">
        {task.description}
      </p>
        {/* Assignee */}
        {task.AssignName && (
          <span className="flex items-center gap-1 text-gray-700">
            <User size={12} />
            {task.AssignName}
          </span>
        )}

      {/* Footer (Assignee + Due Date) */}
      <div className="flex flex-col justify-between items-center text-xs text-gray-600">
      

        {/* Due Date */}
        {task.dueDate && (
          <span className="flex items-center gap-1 text-gray-500">
            <Calendar size={12} />
            {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default Task;



