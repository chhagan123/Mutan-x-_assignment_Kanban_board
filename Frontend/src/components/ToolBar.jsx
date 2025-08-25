import React from "react";
import { useState } from "react";
import { Search, Plus, RotateCcw, RotateCw, Sun, User, Target } from "lucide-react";

export default function Toolbar({setShowModal,searchTerm,setSearchTerm,
  setShowAddColumn,  showAddColumn
}) {
  

  

  
  

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-white">
      {/* Search */}
      <div className="flex items-center border rounded-lg px-2 w-full sm:w-64">
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
      <button onClick={() => setShowModal(true)} className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
        <Plus size={16} /> Add New Task
      </button>

      {/* Add Column */}
      <button onClick={() => setShowAddColumn(true)} className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
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
      <button className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100">
        <Sun size={16} />
      </button>
    </div>
  );
}
