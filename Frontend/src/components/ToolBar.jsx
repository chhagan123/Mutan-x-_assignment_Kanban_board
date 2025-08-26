

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  RotateCcw,
  RotateCw,
  Sun,
  Moon,
} from "lucide-react";

export default function Toolbar({
  setShowModal,
  searchTerm,
  setSearchTerm,
  setShowAddColumn,
  showAddColumn,
  Theme,
  handleTheme,
  handleUndo,
  handleRedo,
}) {
  const assignees = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];
  const [selectedAssignee, setSelectedAssignee] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = Theme ? "#0f172a" : "#f8fafc";
    document.body.style.color = Theme ? "white" : "black";
  }, [Theme]);

  return (
    <div
      className={`
        w-auto flex items-start  flex-wrap  justify-between  gap-10 p-3 rounded-xl shadow-md 
        transition-all duration-300
        ${Theme 
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-purple-500/40" 
          : "bg-white border border-gray-300"}
      `}
    >
      {/* Left Section: Search + Filter */}
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        {/* Search */}
        <div
          className={`
            flex items-center rounded-lg px-2 w-full sm:w-64 transition-all duration-300
            ${Theme 
              ? "bg-gray-800 border border-purple-500/40 text-white" 
              : "bg-white border border-gray-300 text-black"}
          `}
        >
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 outline-none text-sm bg-transparent ${
              Theme ? "text-white placeholder-gray-400" : "text-black"
            }`}
          />
          <Search
            size={18}
            className={Theme ? "text-purple-400" : "text-gray-500"}
          />
        </div>

        {/* Assignee Dropdown */}
        <select
          value={selectedAssignee}
          onChange={(e) => {
            setSelectedAssignee(e.target.value);
            setSearchTerm(e.target.value);
          }}
          className={`
            rounded-lg px-3 py-2 text-sm outline-none transition-all duration-300
            ${Theme
              ? "bg-gray-800 text-white border border-purple-500/40 hover:border-purple-400"
              : "bg-white text-black border border-gray-300 hover:border-gray-400"}
          `}
        >
          <option value="">Select Assignee</option>
          {assignees.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex flex-wrap gap-3 justify-end w-full md:w-auto">
        {/* Add Column */}
        <button
          onClick={() => setShowAddColumn(true)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${Theme
              ? "bg-purple-600/20 border border-purple-500 text-purple-300 hover:bg-purple-600/40 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          <Plus size={18} /> Add Column
        </button>

        {/* Undo */}
        <button
          onClick={handleUndo}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${Theme
              ? "bg-gray-800 border border-purple-500/40 text-white hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              : "bg-gray-100 text-black border hover:bg-gray-200"}
          `}
        >
          <RotateCcw size={18} /> Undo
        </button>

        {/* Redo */}
        <button
          onClick={handleRedo}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${Theme
              ? "bg-gray-800 border border-purple-500/40 text-white hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              : "bg-gray-100 text-black border hover:bg-gray-200"}
          `}
        >
          <RotateCw size={18} /> Redo
        </button>

        {/* Theme Toggle */}
        <button
          onClick={handleTheme}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${Theme
              ? "bg-purple-700 text-white border border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              : "bg-yellow-400 text-black hover:bg-yellow-500"}
          `}
        >
          {Theme ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </div>
  );
}