import { useState, useContext } from "react";
import { useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { saveTask, updateTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

export default function AddTask() {
 
 
const {
  tasks,
  setTasks,
  editingTask,
  setEditingTask,
} = useContext(TaskContext);

const { user } = useContext(AuthContext);


const [task, setTask] = useState(
  editingTask || {
    title: "",
    deadline: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    aiRecommendation: "",
  }
);

useEffect(() => {
  if (editingTask) {
    setTask(editingTask);
  }
}, [editingTask]);




const handleSubmit = async (e) => {
  e.preventDefault();

  if (editingTask) {
  await updateTask(editingTask.id, task);

  setTasks(
    tasks.map((t) =>
      t.id === editingTask.id
        ? { ...t, ...task }
        : t
    )
  );

  setEditingTask(null);
  } else {
    const newTask = await saveTask({
  ...task,
  uid: user.uid,
});

    setTasks([...tasks, newTask]);

    alert("Task Added Successfully!");
  }

  setTask({
    title: "",
    deadline: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    aiRecommendation: "",
  });
};
return (


  <div  className="max-w-xl w-full mx-auto mt-10">
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
  {editingTask ? "✏️ Edit Task" : "➕ Add New Task"}
</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8">
          <label>Task Name</label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 mt-2"
            value={task.title}
            onChange={(e) =>
              setTask({ ...task, title: e.target.value })
            }
          />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <label>Deadline</label>

          <input
            type="date"
            className="w-full border border-gray-300 rounded-xl p-3 mt-2"
            value={task.deadline}
            onChange={(e) =>
              setTask({ ...task, deadline: e.target.value })
            }
          />
        </div>
       <div className="bg-white rounded-3xl shadow-lg p-8">
  <label >
    Priority
  </label>

  <select
    className="w-full border border-gray-200 rounded-2xl p-4 bg-white"
    value={task.priority}
    onChange={(e) =>
      setTask({ ...task, priority: e.target.value })
    }
  >
    <option value="Low">🟢 Low</option>
    <option value="Medium">🟡 Medium</option>
    <option value="High">🔴 High</option>
  </select>
</div>
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <label>Description</label>

          <textarea
            className="w-full border rounded-lg p-3"
            rows="4"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />
        </div>
         <div className="bg-white rounded-3xl shadow-lg p-8">
    <label>Status</label>

    <select
      value={task.status}
      onChange={(e) =>
        setTask({
          ...task,
          status: e.target.value,
        })
      }
       className="w-full border border-gray-200 rounded-2xl p-4 bg-white"
    >
      <option>Pending</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
  </div>


  <br />


        <button
  type="submit"
  className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-700"
>
  {editingTask ? "Update Task" : "Add Task"}
</button>
      </form>
    </div>
  </div>
);
}