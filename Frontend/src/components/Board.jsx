

import React from "react";
import { DndContext } from "@dnd-kit/core";
import Task from "../BoardMember/Task";
import Column from "../BoardMember/Colum";
import { useEffect } from "react";
import { useState } from "react";

 function Board({
  tasks,
  setTasks,
  setShowModal,
  setModalType,
  handleDelete,
  onEdit,
  setSearchTerm,
   searchTerm,
   columns
})


  
  // ✅ Handle drag end
  {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // dropped outside a column


    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ?  { ...task, column: over.id } : task
      )
    );

  }
  
  
 

  const getTasksByColumn = (col) =>
    tasks
      .filter((t) => {
        const search = searchTerm.toLowerCase();
        return (
          t.title.toLowerCase().includes(search) || 
          (t.AssignName && t.AssignName.toLowerCase().includes(search)) // ✅ check AssignName too
        );
      })
      .filter((t) => t.column === col);
  


  // ✅ Group tasks by column
  // const getTasksByColumn = (col) => tasks.filter((t) => t.column === col);

  // return (
  //   <div>
  //     <DndContext onDragEnd={handleDragEnd}>
  //       <div className="mt-6 grid grid-cols-3 gap-4">
  //         {/* TODO Column */}
  //         <Column id="todo" title="📝 Todo">
  //           {getTasksByColumn("todo").map((task) => (
  //             <Task onEdit={onEdit}  handleDelete={handleDelete}  key={task.id} id={task.id} task={task} />
  //           ))}
  //           <button
  //             onClick={() => {
  //               setModalType("todo");
  //               setShowModal(true);
  //             }}
  //             className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  //           >
  //             + Add Task
  //           </button>
  //         </Column>

  //         {/* In Progress Column */}
  //         <Column id="in-progress" title="⚡ In Progress">
  //           {getTasksByColumn("in-progress").map((task) => (
  //             <Task onEdit={onEdit} handleDelete={handleDelete} key={task.id} id={task.id} task={task} />
  //           ))}
  //           <button
  //             onClick={() => {
  //               setModalType("in-progress");
  //               setShowModal(true);
  //             }}
  //             className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  //           >
  //             + Add Progess
  //           </button>
  //         </Column>

  //         {/* Done Column */}
  //         <Column id="done" title="✅ Done">
  //           {getTasksByColumn("done").map((task) => (
  //             <Task onEdit={onEdit} handleDelete={handleDelete} key={task.id} id={task.id} task={task} />
  //           ))}
  //           <button
  //             onClick={() => {
  //               setModalType("done");
  //               setShowModal(true);
  //             }}
  //             className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
  //           >
  //             + Add Done
  //           </button>
  //         </Column>
  //       </div>
  //     </DndContext>
  //   </div>
  // );
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        {/* ✅ Dynamic grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <Column key={col.id} id={col.id} title={col.title}>
              {getTasksByColumn(col.id).map((task) => (
                <Task
                  onEdit={onEdit}
                  handleDelete={handleDelete}
                  key={task.id}
                  id={task.id}
                  task={task}
                />
              ))}

              <button
                onClick={() => {
                  setModalType(col.id);
                  setShowModal(true);
                }}
                className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                + Add {col.title}
              </button>
            </Column>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Board