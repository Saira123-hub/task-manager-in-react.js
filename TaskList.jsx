import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit, darkMode }) => {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div
          className={`p-8 text-center rounded ${
            darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
          }`}
        >
          No tasks found.
        </div>
      ) : (
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              darkMode={darkMode}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TaskList;
