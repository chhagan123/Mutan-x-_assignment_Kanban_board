
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Edit, Trash2, User, Calendar } from "lucide-react";
import { CSS } from '@dnd-kit/utilities';

function Task({ task, handleDelete, onEdit ,setShowDelete,setTaskToDelete}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const stopDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={setNodeRef}
      // style={style}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform), 
        touchAction: 'none', // ✅ important for mobile drag
      }}
      className="touch-none p-4 bg-white rounded-sm shadow mb-4 hover:shadow-md h-40 hover:scale-105 transition-all duration-300"
    >
      {/* Title + Actions */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-sm text-gray-900">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onPointerDown={stopDragStart}
            onMouseDown={stopDragStart}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 rounded hover:bg-indigo-100 transition"
          >
            <Edit size={16} className="text-indigo-600" />
          </button>

          <button
            onPointerDown={stopDragStart}
            onMouseDown={stopDragStart}
            onClick={(e) => {
              e.stopPropagation();
              setTaskToDelete(task)
              setShowDelete(true)
             
            }}
            className="p-1 rounded hover:bg-red-100 transition"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
      )}

      {/* Divider */}
      <hr className="my-2" />

      {/* Footer (Assignee + Date) */}
      <div className="flex justify-between items-center text-xs text-gray-600">
        {task.AssignName && (
          <span className="flex items-center gap-1 text-gray-700">
            <User size={12} /> {task.AssignName}
          </span>
        )}

        {task.dueDate && (
          <span className="flex items-center gap-1 text-gray-500">
            <Calendar size={12} /> {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default Task;

