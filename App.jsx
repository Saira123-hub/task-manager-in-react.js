import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TasksPage from "./pages/TasksPage";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}
