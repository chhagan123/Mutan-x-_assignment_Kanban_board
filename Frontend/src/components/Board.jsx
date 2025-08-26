import React from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Task from "../BoardMember/Task";
import Column from "../BoardMember/Colum";

function Board({
  tasks,
  setTasks,
  setShowModal,
  setModalType,
  handleDelete,
  onEdit,
  setSearchTerm,
  searchTerm,
  columns,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, column: over.id } : task
      )
    );
  };

  const [activeTask, setActiveTask] = React.useState(null);

  const getTasksByColumn = (col) =>
    tasks
      .filter((t) => {
        const search = searchTerm.toLowerCase();
        return (
          t.title.toLowerCase().includes(search) ||
          (t.AssignName && t.AssignName.toLowerCase().includes(search))
        );
      })
      .filter((t) => t.column === col);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* ✅ Centered Scrollable Container */}
      <div className="mt-6 flex  ">
        <div className="flex gap-4 overflow-x-auto  max-w-7xl ">
          {columns.map((col) => (
            <div key={col.id} className="w-85  flex-shrink-0">
              <Column id={col.id} title={col.title}>
                {getTasksByColumn(col.id).map((task) => (
                  <Task
                    onEdit={onEdit}
                    handleDelete={handleDelete}
                    key={task.id}
                    id={task.id}
                    task={task}
                  />
                ))}

                {/* Add new task button */}
                <button
                  onClick={() => {
                    setModalType(col.id);
                    setShowModal(true);
                  }}
                  className="w-full mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  + Add {col.title}
                </button>
              </Column>
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default Board;

