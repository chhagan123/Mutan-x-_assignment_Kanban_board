import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import "./index.css";

import Board from "./components/Board";
import Toolbar from "./components/ToolBar";
import AddTaskModal from "./TaskModel/AddTaskModal";
import EditTaskModal from "./TaskModel/EditTaskModal";
import { AddColumn } from "./TaskModel/AddColumn";
import { DeleteTask } from "./Deleteoperation/DeleteTask";

function App() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [Theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("Theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // --- Undo/Redo State ---
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  // --- Tasks ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Columns ---

  const defaultColumns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
    // just add new column
    // { id: "newcolumn", title: "New Column" }
  ];

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columns");
    if(saved) {
      const parsed = JSON.parse(saved)
      return parsed.length>0 ? parsed:defaultColumns
    }
    return defaultColumns
  });

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persist columns
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(Theme));
    document.body.style.backgroundColor = Theme ? "#0f172a" : "#f8fafc";
    document.body.style.color = Theme ? "white" : "black";
  }, [Theme]);

  // --- History Update Function ---
  const updateBoardState = (newTasks, newColumns) => {
    setHistory([...history, { tasks, columns }]); // Save current state
    setTasks(newTasks);
    setColumns(newColumns);
    setFuture([]); // Clear redo stack
  };

  // --- Undo ---
  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture([{ tasks, columns }, ...future]);
    setTasks(previous.tasks);
    setColumns(previous.columns);
    setHistory(history.slice(0, history.length - 1));
  };

  // --- Redo ---
  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory([...history, { tasks, columns }]);
    setTasks(next.tasks);
    setColumns(next.columns);
    setFuture(future.slice(1));
  };

  // --- Task Functions ---
  const handleAddTask = (task) => {
    updateBoardState([...tasks, task], columns);
  };

  const handleDelete = (id) => {
    console.log("nothing");
    // updateBoardState(
    //   tasks.filter((task) => task.id !== id),
    //   columns
    // );
    const newone = tasks.filter((task) => task.id !== id)
    setTasks(newone)
  };
 

  const handleSaveEdit = (updatedTask) => {
    updateBoardState(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      columns
    );
    setEditTask(null);
  };

  // --- Column Function ---
  const addColumn = (newColumn) => {
    updateBoardState(tasks, [...columns, newColumn]);
  };

  // --- Column Delete Function ---
  const handleDeleteCol = (colId) => {
    const defaultCols = ["todo", "in-progress", "done"]; // protected columns
    if (defaultCols.includes(colId)) return; // don't delete default ones
  
    // Ask for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this column?")) {
      return; // Stop if user cancels
    }
  
    const newColumns = columns.filter((col) => col.id !== colId);
    const newTasks = tasks.filter((task) => task.column !== colId);
  
    updateBoardState(newTasks, newColumns); // update state with history
  };
  

  return (
    <div className="h-full w-full flex flex-col 
    md:pl-20 md:pr-20 md:mt-10 md:mb-10">
      {/* Title */}
      <h1
    className={`text-center mt-3 ${
      Theme ? "text-white" : "text-black"
    } text-2xl mb-6 font-bold`}
  >
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
        setTheme={setTheme}
        Theme={Theme}
        handleTheme={() => setTheme(!Theme)}
        handleRedo={handleRedo}
        handleUndo={handleUndo}
      />
      
      {/* Board */}
      <Board
        className="mb-10 pb-10"
        tasks={tasks}
        setTasks={(newTasks) => updateBoardState(newTasks, columns)}
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        setModalType={setModalType}
        handleDelete={handleDelete}
        onEdit={setEditTask}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columns={columns}
        setColumns={(newColumns) => updateBoardState(tasks, newColumns)}
        setShowAddColumn={showAddColumn}
        setShowDelete={setShowDelete}
        setTaskToDelete={setTaskToDelete}
        Theme={Theme}
        
        
        handleDeleteCol={handleDeleteCol}
      />

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          modalType={modalType}
          Theme={Theme}
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Edit Task Modal */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          Theme={Theme}
          onSave={handleSaveEdit}
          onClose={() => setEditTask(null)}
        />
      )}
     {showDelete && taskToDelete && (
  <DeleteTask
    task={taskToDelete} // 👈 pass single task, not array
    onDelete={(id) => {
      handleDelete(id);
      setShowDelete(false); // close modal
      setTaskToDelete(null); // reset
    }}
    onCancel={() => {
      setShowDelete(false);
      setTaskToDelete(null);
    }}
  />
)}

      {/* Add Column Modal */}
      {showAddColumn && (
        <AddColumn
          columns = {columns}
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