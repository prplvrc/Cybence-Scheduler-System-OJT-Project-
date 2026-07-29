import { useState } from "react";
import { X, Calendar } from "lucide-react";

interface NewTaskFormData {
  title: string;
  description: string;
  assignTo: string;
  dueDate: string;
  status: string;
  priority: string;
  tag: string;
}

type NewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: NewTaskFormData) => void;
};

const teamMembers = ["Sarah Chen", "Daniel", "Mae", "Janina", "Perpaulo"];
const statusOptions = ["Backlog", "To Do", "Ongoing", "Completed", "Unfinished"];
const priorityOptions = ["Low", "Med", "High", "Critical"];
const tagOptions = ["Design", "Development", "Testing", "Documentation", "Bug Fix", "Feature"];

export default function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [formData, setFormData] = useState<NewTaskFormData>({
    title: "",
    description: "",
    assignTo: "Sarah Chen",
    dueDate: "",
    status: "Backlog",
    priority: "Med",
    tag: "Design",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      assignTo: "Sarah Chen",
      dueDate: "",
      status: "Backlog",
      priority: "Med",
      tag: "Design",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">New Task</h1>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-700/50 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-500 transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the task in detail"
              rows={4}
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-500 transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30 resize-none"
            />
          </div>

          {/* Row 1: Assign To & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                Assign To
              </label>
              <select
                name="assignTo"
                value={formData.assignTo}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30 appearance-none cursor-pointer"
              >
                {teamMembers.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 pr-10 text-white transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30"
                />
                <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30 appearance-none cursor-pointer"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30 appearance-none cursor-pointer"
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
              Tag
            </label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white transition focus:border-[#106fb8]/70 focus:bg-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#106fb8]/30 appearance-none cursor-pointer"
            >
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-600/50 px-6 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-700/50 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-2xl bg-gradient-to-r from-[#106fb8] to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-[#106fb8]/30 transition hover:from-[#0e5ea4] hover:to-sky-400 hover:shadow-[#106fb8]/40"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
