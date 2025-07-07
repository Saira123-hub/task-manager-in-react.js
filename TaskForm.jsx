import { motion } from "framer-motion";
import { useState } from "react";
import { FiX, FiFlag } from "react-icons/fi";

const TaskForm = ({ onSave, onCancel, task, darkMode }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "Medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        className={`w-full max-w-md rounded-xl shadow-2xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;
