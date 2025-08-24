import { useState } from "react";
import React from "react";
import "./App.css";
import "./index.css";

import Board from "./components/Board";
import Toolbar from "./components/ToolBar";
import AddTaskModal from "./components/AddTaskModal";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalType, setModalType] = useState(null); // Which column/task type modal relates to
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

 

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
      />

      {/* Board with Drag & Drop */}
      <Board
        tasks={tasks}
        setTasks={setTasks}
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        setModalType={setModalType}
      />

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          modalType={modalType} 
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;

