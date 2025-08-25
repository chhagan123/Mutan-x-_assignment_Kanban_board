

import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import "./index.css";

import Board from "./components/Board";
import Toolbar from "./components/ToolBar";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { AddColumn } from "./components/AddColumn";

function App() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);

  //  Load tasks directly from localStorage OR empty
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  //  Load columns directly from localStorage OR default
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columns");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "todo", title: "Todo" },
          { id: "in-progress", title: "In Progress" },
          { id: "done", title: "Done" },
        ];
  });

  //  Persist tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //  Persist columns whenever they change
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  // --- Task Functions ---
  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSaveEdit = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTask(null);
  };

  // --- Column Function ---
  const addColumn = (newColumn) => {
    setColumns((prev) => [...prev, newColumn]);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-shadow-black text-3xl mb-4">
        Welcome To Kanban Board
      </h1>

      {/* Toolbar */}
      <Toolbar
        showModal={showModal}
        setShowModal={setShowModal}
        setModalType={setModalType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowAddColumn={setShowAddColumn}
        showAddColumn={showAddColumn}
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
        columns={columns}
        setColumns={setColumns}
        setShowAddColumn={showAddColumn}
      />

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          modalType={modalType}
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Edit Task Modal */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onSave={handleSaveEdit}
          onClose={() => setEditTask(null)}
        />
      )}

      {/* Add Column Modal */}
      {showAddColumn && (
        <AddColumn
          onClose={() => setShowAddColumn(false)}
          onSave={(col) => {
            addColumn(col);
            setShowAddColumn(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
