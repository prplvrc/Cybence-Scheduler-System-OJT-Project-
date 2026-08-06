import { useState, type FormEvent } from "react";
import { Send, AlertCircle, CheckCircle2, Clock, Plus } from "lucide-react";

type RequestsProps = {
  currentUser: { id: string; name: string; role?: string };
};

type AdminRequest = {
  id: string;
  status: "Pending" | "Approved" | "Rejected";
  title: string;
  description: string;
  deadline: string;
  type: string;
  requester: string;
  reviewer: string;
  badge: string;
  otherReason?: string;
};

const initialAdminRequests: AdminRequest[] = [
  {
    id: "r1",
    status: "Pending",
    title: "Weekly analytics report automation",
    description:
      "The analytics pipeline has more complexity than initially scoped. Discovered 3 additional data sources that need to be integrated, each requiring custom ETL logic.",
    deadline: "Aug 16, 2026",
    type: "Extensions",
    requester: "Priya Patel",
    reviewer: "Alex Chen",
    badge: "PP",
  },
  {
    id: "r2",
    status: "Pending",
    title: "API rate limiting implementation",
    description:
      "Discovered a complex edge case in the rate limiter logic that requires additional Redis cluster configuration, sentinel setup, and load testing before it can go to production.",
    deadline: "Aug 13, 2026",
    type: "Revisions",
    requester: "Priya Patel",
    reviewer: "Alex Chen",
    badge: "PP",
  },
  {
    id: "r3",
    status: "Approved",
    title: "CI/CD pipeline optimization",
    description:
      "Build optimization requires additional time. Legacy dependencies need to be refactored before parallelization is possible — estimated 5 additional days of work.",
    deadline: "Aug 21, 2026",
    type: "Extensions",
    requester: "Priya Patel",
    reviewer: "Alex Chen",
    badge: "PP",
  },
  {
    id: "r4",
    status: "Pending",
    title: "Database schema cleanup request",
    description:
      "The employee has requested an adjustment to the schema to support a new reporting dimension and needs a higher-level review before scheduling the work.",
    deadline: "Aug 23, 2026",
    type: "Other",
    requester: "Mia Santos",
    reviewer: "Alex Chen",
    badge: "MS",
    otherReason: "Additional reporting dimension must be supported for finance data exports.",
  },
];

export default function Requests({ currentUser }: RequestsProps) {
  const [requestType, setRequestType] = useState("Due Date Extension");
  const [priority, setPriority] = useState("Normal");
  const [impactLevel, setImpactLevel] = useState("Internal Only");
  const [otherReason, setOtherReason] = useState("");
  const [reasonDetails, setReasonDetails] = useState("");
  const [formData, setFormData] = useState({
    fullName: currentUser.name,
    department: "Development",
    position: "Developer",
    supervisor: "",
    contactNumber: "+63 900 000 0000",
    email: currentUser.name.toLowerCase().replace(/\s+/g, '.') + "@cybence.com",
    taskName: "",
    currentDueDate: "",
    requestedDueDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>(initialAdminRequests);
  const [adminMode, setAdminMode] = useState<"Overview" | "New Request">("Overview");

  const formatDeadline = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const createInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAdmin && adminMode === "New Request") {
      const requestCategory =
        requestType === "Due Date Extension"
          ? "Extensions"
          : requestType === "Revision of Task"
          ? "Revisions"
          : "Other";

      const newAdminRequest: AdminRequest = {
        id: `r${Date.now()}`,
        status: "Pending",
        title:
          requestType === "Due Date Extension"
            ? `Due date extension for ${formData.taskName || "task"}`
            : requestType === "Revision of Task"
            ? `Revision request for ${formData.taskName || "task"}`
            : otherReason || `Other request for ${formData.taskName || "task"}`,
        description: reasonDetails || "Requested change submitted by admin.",
        deadline: formatDeadline(formData.requestedDueDate),
        type: requestCategory,
        requester: formData.fullName,
        reviewer: currentUser.name,
        badge: createInitials(formData.fullName),
        otherReason: requestType === "Other" ? otherReason : undefined,
      };

      setAdminRequests((prev) => [newAdminRequest, ...prev]);
      setAdminMode("Overview");
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const isAdmin = currentUser.role === "Admin";
  const [selectedTab, setSelectedTab] = useState<"Extensions" | "Revisions" | "Other">("Extensions");

  const filteredAdminRequests = adminRequests.filter(
    (request) => request.type === selectedTab
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const updateRequestStatus = (id: string, newStatus: AdminRequest["status"]) => {
    setAdminRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  if (isAdmin) {
    return (
      <div className="w-full min-h-[calc(100vh-32px)] p-6 sm:p-8 flex flex-col font-sans text-slate-800">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Requests</h1>
            <p className="text-sm text-slate-500 font-medium">
              Review and manage current request submissions from your team.
            </p>
            <p className="text-xs text-slate-400">{today}</p>
          </div>

        </div>

        {adminMode === "Overview" && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {[
              { label: "Extensions", value: "Extensions" },
              { label: "Revisions", value: "Revisions" },
              { label: "Other", value: "Other" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setSelectedTab(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedTab === item.value
                    ? "bg-[#106fb8] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setAdminMode("New Request")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#106fb8] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#106fb8]/25 hover:bg-[#0d5ca0]"
            >
              <Plus className="w-4 h-4" />
              New Request
            </button>
          </div>
        )}

        {adminMode === "New Request" && (
          <div className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:min-h-[80vh]">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-slate-900">New Request</h2>
                    <p className="text-sm text-slate-500">Create a new request using the same form experience as a regular user.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAdminMode("Overview")}
                    className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div className="space-y-5">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base font-bold text-slate-800">1. Employee & Task Context</h3>
                        <p className="text-xs text-slate-500">Identify who is requesting and the impacted task.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-slate-700">Task Assigned To</label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
                            <select
                              required
                              value={formData.department}
                              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            >
                              <option value="Development">Development</option>
                              <option value="Operations">Operations</option>
                              <option value="Design">Design</option>
                              <option value="Quality Assurance">Quality Assurance</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Position</label>
                            <select
                              required
                              value={formData.position}
                              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            >
                              <option value="Developer">Developer</option>
                              <option value="Team Lead">Team Lead</option>
                              <option value="Designer">Designer</option>
                              <option value="QA Specialist">QA Specialist</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Task Creator / Lead</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g., Jane Doe"
                              value={formData.supervisor}
                              onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Task Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g., UI Design Update"
                              value={formData.taskName}
                              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-semibold text-slate-700">Task Dependency / Impact</label>
                          <select
                            value={impactLevel}
                            onChange={(e) => setImpactLevel(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                          >
                            <option value="Internal Only">Self-contained (No downstream impact)</option>
                            <option value="Blocks Team">Blocks Other Team Members</option>
                            <option value="Client Facing">Impacts Client Milestone / Deadline</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 lg:border-l lg:border-slate-100 lg:pl-12">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base font-bold text-slate-800">2. Request Details & Timeline</h3>
                        <p className="text-xs text-slate-500">Specify requested modifications and priority.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Request Type</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              { title: "Due Date Extension", desc: "Push deadline" },
                              { title: "Revision of Task", desc: "Modify scope" },
                              { title: "Other", desc: "Custom reason" },
                            ].map((item) => (
                              <div
                                key={item.title}
                                onClick={() => setRequestType(item.title)}
                                className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                                  requestType === item.title
                                    ? "border-[#106fb8] bg-blue-50/50 text-[#106fb8] font-semibold shadow-xs"
                                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                                }`}
                              >
                                <p className="text-xs">{item.title}</p>
                                <p className="text-[10px] opacity-75 mt-0.5">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {requestType === "Other" && (
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Specify Reason</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g., Reassigning task ownership"
                              value={otherReason}
                              onChange={(e) => setOtherReason(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Current Due Date</label>
                            <input
                              type="date"
                              required
                              value={formData.currentDueDate}
                              onChange={(e) => setFormData({ ...formData, currentDueDate: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Requested Due Date</label>
                            <input
                              type="date"
                              required
                              value={formData.requestedDueDate}
                              onChange={(e) => setFormData({ ...formData, requestedDueDate: e.target.value })}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">Priority Level</label>
                            <select
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                            >
                              <option value="Normal">Normal</option>
                              <option value="Urgent">Urgent</option>
                              <option value="Critical">Critical</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      Reason / Detailed Justification <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Provide comprehensive details regarding why this extension or task change is necessary..."
                      value={reasonDetails}
                      onChange={(e) => setReasonDetails(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Requests are sent to your direct lead for final approval.</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setAdminMode("Overview")}
                        className="rounded-xl border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#106fb8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#106fb8]/30 transition-all hover:bg-[#0d5ca0] hover:-translate-y-0.5"
                      >
                        <Send className="w-4 h-4" />
                        Submit Request
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {filteredAdminRequests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                      {request.status}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {request.type}
                    </span>
                    <span className="text-xs text-slate-400">7d ago</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">{request.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{request.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <Clock className="h-3.5 w-3.5 text-[#106fb8]" />
                      Requested deadline: {request.deadline}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#106fb8]/10 text-sm font-bold text-[#106fb8]">
                        {request.badge}
                      </span>
                      {request.requester}
                    </span>
                  </div>

                  {request.otherReason && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">
                        Employee-specified request detail
                      </span>
                      <p>{request.otherReason}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 items-stretch sm:flex-row lg:flex-col">
                  {request.status === "Pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => updateRequestStatus(request.id, "Rejected")}
                        className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRequestStatus(request.id, "Approved")}
                        className="inline-flex items-center justify-center rounded-xl bg-[#106fb8] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0d5ca0]"
                      >
                        Approve
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${
                        request.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {request.status}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAdminRequests.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
              No requests found for the selected category.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-32px)] p-6 sm:p-8 flex flex-col font-sans text-slate-800">
      
      {/* Prominent Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Request Form</h1>
              <p className="text-sm text-slate-500 font-medium">
                Submit a formal request for a due date extension or task scope change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Request submitted successfully and forwarded to your supervisor!
        </div>
      )}

      {/* Main Form Container */}
      <div className="flex-1 w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: Employee & Task Context */}
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    1. Employee & Task Context
                  </h2>
                  <p className="text-xs text-slate-500">Identify who is requesting and the impacted task.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Task Assigned To
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
                      <select
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      >
                        <option value="Development">Development</option>
                        <option value="Operations">Operations</option>
                        <option value="Design">Design</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Position</label>
                      <select
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      >
                        <option value="Developer">Developer</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Designer">Designer</option>
                        <option value="QA Specialist">QA Specialist</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Task Creator / Lead</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Jane Doe"
                        value={formData.supervisor}
                        onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Task Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., UI Design Update"
                        value={formData.taskName}
                        onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Task Dependency / Impact</label>
                    <select
                      value={impactLevel}
                      onChange={(e) => setImpactLevel(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    >
                      <option value="Internal Only">Self-contained (No downstream impact)</option>
                      <option value="Blocks Team">Blocks Other Team Members</option>
                      <option value="Client Facing">Impacts Client Milestone / Deadline</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: Request Details & Timeline */}
              <div className="space-y-5 lg:border-l lg:border-slate-100 lg:pl-12">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    2. Request Details & Timeline
                  </h2>
                  <p className="text-xs text-slate-500">Specify requested modifications and priority.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">Request Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { title: "Due Date Extension", desc: "Push deadline" },
                        { title: "Revision of Task", desc: "Modify scope" },
                        { title: "Other", desc: "Custom reason" },
                      ].map((item) => (
                        <div
                          key={item.title}
                          onClick={() => setRequestType(item.title)}
                          className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                            requestType === item.title
                              ? "border-[#106fb8] bg-blue-50/50 text-[#106fb8] font-semibold shadow-xs"
                              : "border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <p className="text-xs">{item.title}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {requestType === "Other" && (
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Specify Reason</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Reassigning task ownership"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Current Due Date</label>
                      <input
                        type="date"
                        required
                        value={formData.currentDueDate}
                        onChange={(e) => setFormData({ ...formData, currentDueDate: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Requested Due Date</label>
                      <input
                        type="date"
                        required
                        value={formData.requestedDueDate}
                        onChange={(e) => setFormData({ ...formData, requestedDueDate: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">Priority Level</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* FULL-WIDTH REASON TEXT AREA */}
            <div className="pt-2">
              <label className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                Reason / Detailed Justification <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="Provide comprehensive details regarding why this extension or task change is necessary..."
                value={reasonDetails}
                onChange={(e) => setReasonDetails(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition resize-none"
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Requests are sent to your direct lead for final approval.</span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#106fb8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#106fb8]/30 transition-all hover:bg-[#0d5ca0] hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Submit Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}