import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import { TaskCategory, TaskPriority } from '../types/task';
import { Button } from './ui/button';
import { Logo } from './Logo';

export function TaskForm() {
  const { addTask } = useTaskStore();
  const { user } = useAuthStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('low');
  const [category, setCategory] = useState<TaskCategory>('BAU');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // New state for modal visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !user) {
      setError('All fields are required');
      return;
    }

    const taskData = {
      title,
      description,
      timeSpent: 0, // Initialize timeSpent to 0, can be updated later
      priority,
      category,
      reference,
      userId: user.uid, // Use the authenticated user's ID
    };

    setLoading(true);
    setError(null);

    try {
      await addTask(taskData);
      setTitle('');
      setDescription('');
      setPriority('low');
      setCategory('BAU');
      setReference('');
      setModalVisible(true); // Show modal when task is created
    } catch (error) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create New Task</h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
            >
              <option value="BAU">BAU</option>
              <option value="Ad Hoc">Ad Hoc</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Reference (Optional)</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-transparent text-white"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </form>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg">
          
        <div className="bg-black/60 p-6 rounded-lg w-96 backdrop-blur-lg border border-white/80">
        <Logo/>
          <h3 className="text-xl text-blue-400 font-semibold">Task Created Successfully</h3>
          <p className="mt-2 text-white-300">Your new task has been created.</p>
          <div className="mt-4 flex justify-end space-x-4">
            <Button
              onClick={() => setModalVisible(false)} // Close modal
              className="bg-gray-600 text-white hover:bg-gray-500"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}
