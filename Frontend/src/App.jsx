import { useState } from "react";
import React from "react";
import "./App.css";
import "./index.css";

import Board from "./components/Board";
import Toolbar from "./components/ToolBar";
import AddTaskModal from "./components/AddTaskModal";
import { useEffect } from "react";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalType, setModalType] = useState(null); // Which column/task type modal relates to
  const [showModal, setShowModal] = useState(false);
  const [editTask,setEditTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  },[]);

 
  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };


 //
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
  
    setTasks(updatedTasks); 
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // overwrite localStorage
  };

  const handleSaveEdit = (updatedTask) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
  
      // Save to localStorage after updating
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  
      return updatedTasks;
    });
  
    setEditTask(null); // close modal
  };
  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-shadow-black text-3xl mb-4">Welcome To Kanban Board</h1>

      {/* Toolbar */}
      <Toolbar 
        showModal={showModal} 
        setShowModal={setShowModal} 
        setModalType={setModalType}
        searchTerm = {searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Board with Drag & Drop */}
      <Board
        tasks={tasks}
        setTasks={setTasks}
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        setModalType={setModalType}
        handleDelete={handleDelete}
        onEdit={setEditTask} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          modalType={modalType} 
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}
      {editTask && (
  <EditTaskModal
    task={editTask}
    onSave={handleSaveEdit}
    onClose={() => setEditTask(null)}
    
  />
)}
    

    </div>
  );
}

export default App;

