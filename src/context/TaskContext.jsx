import { createContext, useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

 useEffect(() => {
  if (user) {
    loadTasks(user.uid);
  } else {
    setTasks([]);
  }
}, [user]);

  const loadTasks = async (uid) => {
  const data = await getTasks(uid);
  setTasks(data);
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loadTasks,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}