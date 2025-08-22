import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  // ✅ Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    console.log(savedTasks)
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    console.log(tasks.feature)
  }, []);

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // ✅ Helper function to filter tasks per column
  const getTasksByColumn = (columnName) => {
    return tasks.filter((task) => task.column === columnName);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        + Add Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* ✅ Kanban Columns */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {/* Todo Column */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-bold mb-3">📝 Todo</h2>
          {getTasksByColumn("todo").map((task, index) => (
            <div
              key={index}
              className="p-3 border rounded-md shadow mb-2 bg-white"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Feature: {task.feature} | Due: {task.dueDate}
              </p>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-bold mb-3">⚡ In Progress</h2>
          {getTasksByColumn("in-progress").map((task, index) => (
            <div
              key={index}
              className="p-3 border rounded-md shadow mb-2 bg-white"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Feature: {task.feature} | Due: {task.dueDate}
              </p>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-bold mb-3">✅ Done</h2>
          {getTasksByColumn("done").map((task, index) => (
            <div
              key={index}
              className="p-3 border rounded-md shadow mb-2 bg-white"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Feature: {task.feature} | Due: {task.dueDate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import AddTaskModal from "./AddTaskModal";

// export default function Board() {
//   const [showModal, setShowModal] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   // ✅ Retrieve tasks from localStorage when component loads
//   useEffect(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
   
//   }, []);
//   console.log(tasks.feature)

//   const handleAddTask = (task) => {
//     const updatedTasks = [...tasks, task];
//     setTasks(updatedTasks);

//     // ✅ Save updated tasks in localStorage
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowModal(true)}
//         className="px-4 py-2 bg-indigo-600 text-white rounded"
//       >
//         + Add Task
//       </button>

//       {showModal && (
//         <AddTaskModal
//           onClose={() => setShowModal(false)}
//           onAddTask={handleAddTask}
//         />
//       )}

//       <div className="mt-4 flex-col">
//         {tasks.map((task, index) => (
//           <div
//             key={index}
//             className="p-3 border h-auto w-40 flex flex-col rounded-md shadow mb-2 bg-white"
//           >
//             <h3 className="font-semibold">{task.title}</h3>
//             <p className="text-sm text-gray-600">{task.description}</p>
//             <p className="text-xs text-gray-500 mt-1">
//               Column: {task.column} | Feature: {task.feature} | Due:{" "}
//               {task.dueDate}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
