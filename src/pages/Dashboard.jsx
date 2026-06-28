import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { deleteTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import DailyPlanner from "../components/DailyPlanner";
import SubtaskChecklist from "../components/SubtaskChecklist";

export default function Dashboard() {
  
  const navigate = useNavigate();

  const {
  tasks,
  setTasks,
  setEditingTask,
} = useContext(TaskContext);

  const handleDelete = async (id) => {
  await deleteTask(id);

  setTasks(tasks.filter((task) => task.id !== id));
};
  

  const getRiskLevel = (deadline) => {
    const today = new Date();
    const due = new Date(deadline);

    const diff = Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 2) return "🔴 High Risk";
    if (diff <= 5) return "🟡 Medium Risk";

    return "🟢 Safe";
  };

  
    const highRiskTasks = tasks.filter((task) => {
  const today = new Date();
  const due = new Date(task.deadline);

  const diff = Math.ceil(
    (due - today) / (1000 * 60 * 60 * 24)
  );

  return diff <= 2;

    });

    const pendingTasks = tasks.filter(
  (task) => task.status === "Pending"
);

const inProgressTasks = tasks.filter(
  (task) => task.status === "In Progress"
);

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
);


  return (
   <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          
 <h1 className="text-3xl font-bold text-slate-800">
  Dashboard
</h1>
          <p className="text-gray-500 mt-2">
            Your AI Productivity Companion
          </p>
        </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-md px-5 py-3 rounded-2xl">
  🤖 AI is watching over your deadlines
</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
  <div className="text-4xl mb-3">🟡</div>
  <h3 className="text-gray-500">Pending</h3>
  <p className="text-4xl font-bold mt-2">
    {pendingTasks.length}
  </p>
</div>

<div className="bg-white rounded-3xl shadow-lg p-6">
  <div className="text-4xl mb-3">🔵</div>
  <h3 className="text-gray-500">In Progress</h3>
  <p className="text-4xl font-bold mt-2">
    {inProgressTasks.length}
  </p>
</div>

<div className="bg-white rounded-3xl shadow-lg p-6">
  <div className="text-4xl mb-3">🟢</div>
  <h3 className="text-gray-500">Completed</h3>
  <p className="text-4xl font-bold mt-2">
    {completedTasks.length}
  </p>
</div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-gray-500">Upcoming Tasks</h3>
          <p className="text-4xl font-bold mt-2">
            {tasks.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-gray-500">AI Risk Alerts</h3>
          <p className="text-4xl font-bold text-red-500 mt-2">
             {highRiskTasks.length}
          </p>
        </div>
      </div>

      <DailyPlanner />

      {/* Task List */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          📋 My Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks added yet 🚀
          </p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-2xl p-4 hover:shadow-md"
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">
                    {task.title}
                  </h3>

                  <span
  className={`px-3 py-1 rounded-full ${
    task.status === "Completed"
      ? "bg-green-100 text-green-700"
      : task.status === "In Progress"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {task.status}
</span>
                </div>

                <p className="text-gray-500 mt-2">
                  📅 {task.deadline}
                </p>
                <p className="mt-2 font-medium">
  {getRiskLevel(task.deadline)}
</p>

                <p className="mt-2">
  {task.description}
</p>

<SubtaskChecklist
  task={task}
  tasks={tasks}
  setTasks={setTasks}
/>


               <div className="mt-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
    {task.priority} Priority
  </span>

  <button
    onClick={() => handleDelete(task.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
  >
    🗑 Delete
  </button>

<button
  onClick={() => {
    setEditingTask(task);
    navigate("/add-task");
  }}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
>
  ✏️ Edit
</button>
</div>
</div>
              
            ))}
          </div>
        )}
      </div>
    </div>

  );
}