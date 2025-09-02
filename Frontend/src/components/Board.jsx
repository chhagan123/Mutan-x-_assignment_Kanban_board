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
  setShowDelete,
  setTaskToDelete,
  Theme,
  setcolid,
  onDelete,
  handleDeleteCol,
  ...props
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

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

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
    <DndContext onDragEnd={handleDragEnd} >
      {/* ✅ Centered Scrollable Container */}
      <div className="mt-6 flex mb-2 ">
        <div className="flex gap-4 w-full  h-auto overflow-x-hidden  lg:overflow-y-hidden 
      overflow-y-auto lg:overflow-x-auto   
      flex-col lg:flex-row    items-center lg:items-start  scroll-hidden">
      
       
          {columns.map((col) => (
            <div key={col.id} className="w-84 h-auto  flex-shrink-0">
              <Column id={col.id} Theme={Theme} columns={columns} onDelete={() => handleDeleteCol(col.id)}   title={col.title}>
                {getTasksByColumn(col.id).map((task) => (
                  <Task
                  onClick={() => onEdit(task)} 
                    onEdit={onEdit}
                    setShowDelete = {setShowDelete}
                    setTaskToDelete= {setTaskToDelete}
                    handleDelete={handleDelete}
                    key={task.id}
                    id={task.id}
                    task={task}
                    Theme={Theme}
                  />
                ))}

                {/* Add new task button */}
                <button
                  onClick={() => {
                    setModalType(col.id);
                    setShowModal(true);
                  }}
                  className="w-10xl mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  + Add New Task
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


