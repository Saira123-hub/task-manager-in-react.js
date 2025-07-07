import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { ...taskData, id: Date.now(), completed: false },
      ]);
      setSuccessMessage("Task successfully added!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
     {successMessage && (
  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded bg-green-600 text-white shadow-lg z-50 transition-all duration-300 animate-bounce">
    {successMessage}
  </div>
)}


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded border"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded border ${
              filter === f
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
        onToggleComplete={(id) =>
          setTasks((prev) =>
            prev.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            )
          )
        }
        onEdit={(task) => {
          setEditingTask(task);
          setIsFormOpen(true);
        }}
        darkMode={darkMode}
      />

      {isFormOpen && (
        <TaskForm
          onSave={handleSaveTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          task={editingTask}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
