import { updateTask } from "../services/taskService";

export default function SubtaskChecklist({
  task,
  tasks,
  setTasks,
}) {
  if (!task.subtasks) return null;

  const completed = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const percentage = Math.round(
    (completed / task.subtasks.length) * 100
  );
const toggleSubtask = async (index) => {
  const updatedSubtasks = [...task.subtasks];

  updatedSubtasks[index].completed =
    !updatedSubtasks[index].completed;

  const completedCount = updatedSubtasks.filter(
    (subtask) => subtask.completed
  ).length;

  let status = "Pending";

  if (completedCount === updatedSubtasks.length) {
    status = "Completed";
  } else if (completedCount > 0) {
    status = "In Progress";
  }

  await updateTask(task.id, {
    subtasks: updatedSubtasks,
    status,
  });

  setTasks(
    tasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            subtasks: updatedSubtasks,
            status,
          }
        : t
    )
  );
};

  return (
    <div className="mt-5">

      <h3 className="font-bold text-lg mb-3">
        🧩 AI Task Checklist
      </h3>

      {task.subtasks.map((subtask, index) => (
        <label
          key={index}
          className="flex items-center gap-3 mb-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={subtask.completed}
            onChange={() => toggleSubtask(index)}
          />

          <span
            className={
              subtask.completed
                ? "line-through text-gray-400"
                : ""
            }
          >
            {subtask.title}
          </span>
        </label>
      ))}

      <div className="mt-5">

        <div className="flex justify-between mb-2">
          <span>Progress</span>

          <span>
            {completed}/{task.subtasks.length}
          </span>
        </div>

        <div className="bg-gray-200 rounded-full h-3">

          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          ></div>

        </div>

        <p className="mt-2 text-sm text-gray-500">
          {percentage}% Completed
        </p>

      </div>

    </div>
  );
}