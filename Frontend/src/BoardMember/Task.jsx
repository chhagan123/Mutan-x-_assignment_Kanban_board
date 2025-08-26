import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Edit, Trash2, User, Calendar } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

function Task({
  task,
  handleDelete,
  onEdit,
  setShowDelete,
  setTaskToDelete,
  Theme,
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const stopDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`
        touch-none p-4 rounded-sm ${
          Theme
            ? "bg-gray-800 text-white border w-auto  border-purple-500 shadow-md shadow-purple/50" // Dark mode
            : "bg-gray  text-gray-900 border border-gray-300 shadow-md shadow-gray-400"
        } // Light mode
 mb-4  h-40 transition-all duration-300
        ${Theme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Title + Actions */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-sm">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onPointerDown={stopDragStart}
            onMouseDown={stopDragStart}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className={`p-1 rounded transition ${
              Theme ? "hover:bg-gray-700" : "hover:bg-indigo-100"
            }`}
          >
            <Edit
              size={16}
              className={Theme ? "text-indigo-400" : "text-indigo-600"}
            />
          </button>

          <button
            onPointerDown={stopDragStart}
            onMouseDown={stopDragStart}
            onClick={(e) => {
              e.stopPropagation();
              setTaskToDelete(task);
              setShowDelete(true);
            }}
            className={`p-1 rounded transition ${
              Theme ? "hover:bg-red-700" : "hover:bg-red-100"
            }`}
          >
            <Trash2
              size={16}
              className={Theme ? "text-red-400" : "text-red-500"}
            />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={`${
            Theme ? "text-gray-300" : "text-gray-600"
          } text-xs mb-2`}
        >
          {task.description}
        </p>
      )}

      {/* Divider */}
      <hr className={Theme ? "border-gray-700 my-2" : "border-gray-200 my-2"} />

      {/* Footer (Assignee + Date) */}
      <div
        className={`flex justify-between items-center text-xs ${
          Theme ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {task.AssignName && (
          <span className="flex items-center gap-1">
            <User size={12} /> {task.AssignName}
          </span>
        )}

        {task.dueDate && (
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default Task;
