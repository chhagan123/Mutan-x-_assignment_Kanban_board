
import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import Task from "./Task";
export default function Board({showModal,setShowModal}) {
  // const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [todoNum,setTodonum] = useState(0);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active) {
      const updatedTasks = tasks.map((task) =>
        task.title === active.id ? { ...task, column: over.id } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const getTasksByColumn = (columnName) =>
    tasks.filter((task) => task.column === columnName);

  return (
    <div >

      <DndContext onDragEnd={handleDragEnd}>
    
      {/* i am doing add task in tollBar.jsx if i want to use i can do then }
      {/* <button
        onClick={() => setShowModal(true)}
        className="px-4 ml-80 py-2 bg-indigo-600 text-white rounded"
      >
        + Add Task
      </button> */}

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}
     

     

      {/* Kanban Columns */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Column id="todo" title="📝 Todo">
          {getTasksByColumn("todo").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>

        <Column id="in-progress" title="⚡ In Progress">
          {getTasksByColumn("in-progress").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>

        <Column id="done" title="✅ Done">
          {getTasksByColumn("done").map((task, index) => (
            <Task key={index} id={task.title} task={task} />
          ))}
        </Column>
      </div>
    </DndContext>
    
    </div>

    
    
  );
}

/* ----------- Reusable Column Component ----------- */
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
        <span className="text-sm bg-indigo-600 text-white px-2 py-1 rounded-full">
          {taskCount}
        </span>
      </div>

      {children}
    </div>
  );
}

