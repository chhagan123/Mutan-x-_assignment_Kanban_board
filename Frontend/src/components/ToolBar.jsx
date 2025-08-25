import React from "react";
import { useState,useEffect } from "react";
import { Search, Plus, RotateCcw, RotateCw, Sun, User, Target,Moon } from "lucide-react";

export default function Toolbar({setShowModal,searchTerm,setSearchTerm,
  setShowAddColumn,  showAddColumn , setTheme,Theme,handleTheme
}) {

  useEffect(() => {
    document.body.style.backgroundColor = Theme ? "#0f172a" : "#f8fafc"; 
    document.body.style.color = Theme ? "white" : "black";
  }, [Theme]);
  
return (
    <div className="flex flex-wrap items-center max-w-8xl gap-4 p-2 border border-yellow rounded-lg bg-white">
      {/* Search */}
      <div className="flex items-center border rounded-lg px-2 w-full sm:w-115">
        <input
          type="text"
           placeholder="Search by title or Assignee Emp"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         
          className="w-full p-1 outline-none bg-transparent text-sm"
        />
        <Search size={16} className="text-gray-500" />
      </div>

      {/* Filter By User (Dropdown) */}
     

      {/* Add Task */}
      <button onClick={() => setShowModal(true)} className="flex items-center  bg-green-400 gap-1 border rounded-lg px-3 py-1 text-sm">
        <Plus size={16} /> Add New Task
      </button>

      {/* Add Column */}
      <button onClick={() => setShowAddColumn(true)} className="flex items-center bg-blue-400 gap-1 border rounded-lg px-3 py-1 text-sm">
        <Plus size={16} /> Add New Column
      </button>

      {/* Undo */}
      <button className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
        <RotateCcw size={16} /> Undo
      </button>

      {/* Redo */}
      <button className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
        <RotateCw size={16} /> Redo
      </button>

      {/* Theme */}
      <button onClick={handleTheme} className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
        {Theme ?     <Sun size={16} /> : <Moon /> }
      </button>
    </div>
  );
}
