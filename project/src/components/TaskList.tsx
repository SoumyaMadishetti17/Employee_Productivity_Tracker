import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "../store/taskStore";
import { formatDate, formatTime } from "../lib/utils";
import { Clock, Flag, User, CheckCircle, Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";

export function TaskList() {
  const {
    tasks,
    completeTask,
    loading,
    subscribeToUserTasks,
    fetchTasksOnce,
    deleteTask,
    updateTask,
  } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State for managing editing task
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedPriority, setEditedPriority] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<string>(""); // Add a category edit field
  const [editedReference, setEditedReference] = useState<string>(""); // Add a reference edit field

  useEffect(() => {
    const unsubscribe = subscribeToUserTasks();
    return unsubscribe;
  }, [subscribeToUserTasks]);

  useEffect(() => {
    fetchTasksOnce();
  }, [fetchTasksOnce]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
    setEditedCategory(task.category);
    setEditedReference(task.reference || "");
  };

  const handleSaveEdit = async () => {
    if (editingTask) {
      await updateTask(editingTask.id, {
        title: editedTitle,
        description: editedDescription,
        priority: editedPriority,
        category: editedCategory,
        reference: editedReference,
      });
      setEditingTask(null); // Close the modal/form after saving
    }
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleMarkAsComplete = async (task: Task) => {
    await completeTask(task.id);
  };

  const calculateTimeGap = (createdAt: string, completedAt: string) => {
    const createdDate = new Date(createdAt);
    const completedDate = new Date(completedAt);
    const timeDifference = completedDate.getTime() - createdDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours} hours, ${minutes % 60} minutes`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {editingTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="w-1/3 backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Task</h2>
            
            {/* Title Input */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-200"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter task title"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-200"
              >
                Description
              </label>
              <textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter task description"
              />
            </div>

            {/* Priority Select */}
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-200"
              >
                Priority
              </label>
              <select
                id="priority"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="low" className="bg-black/60">Low</option>
                <option value="medium" className="bg-black/60">Medium</option>
                <option value="high" className="bg-black/60">High</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-200"
              >
                Category
              </label>
              <select
                id="category"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="BAU" className="bg-black/60">BAU</option>
                <option value="Ad Hoc" className="bg-black/60">Ad Hoc</option>
                <option value="Project" className="bg-black/60">Project</option>
              </select>
            </div>

            {/* Reference Input */}
            <div className="mb-4">
              <label
                htmlFor="reference"
                className="block text-sm font-medium text-gray-200"
              >
                Reference (Optional)
              </label>
              <input
                id="reference"
                type="text"
                value={editedReference}
                onChange={(e) => setEditedReference(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter task reference (optional)"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Button
                onClick={() => setEditingTask(null)}
                variant="outline"
                className="text-gray-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                variant="primary"
                className="text-white bg-green-500"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {tasks.length === 0 ? (
          <p className="text-white">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              variants={item}
              className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-300"
                      : task.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{task.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  {task.category}
                </div>
                {task.reference && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {task.reference}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Created: {formatDate(task.createdAt)}
                  {task.completedAt &&
                    ` • Completed: ${formatDate(task.completedAt)}`}
                  {task.completedAt &&
                    ` • Time Gap: ${calculateTimeGap(
                      task.createdAt,
                      task.completedAt
                    )}`}
                </div>

                {!task.completedAt && (
                  <Button
                    onClick={() => handleMarkAsComplete(task)}
                    disabled={loading}
                    variant="ghost"
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <Button
                  onClick={() => handleEdit(task)}
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(task.id)}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </>
  );
}
