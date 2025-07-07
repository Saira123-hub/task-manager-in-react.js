import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit, darkMode }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 rounded border shadow ${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-5 h-5 rounded-full border ${
              task.completed ? "bg-green-500" : ""
            }`}
          >
            {task.completed && <FiCheck className="text-white" size={12} />}
          </button>
          <div>
            <h3
              className={`font-semibold ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="text-xs">{task.description}</p>
            {task.dueDate && (
              <p className="text-xs">Due: {task.dueDate}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)}>
            <FiEdit2 />
          </button>
          <button onClick={() => onDelete(task.id)}>
            <FiTrash2 className="text-red-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
