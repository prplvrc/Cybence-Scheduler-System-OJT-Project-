import { useState, type FormEvent } from "react";
import { Send, AlertCircle, CheckCircle2,} from "lucide-react";

export default function Requests() {
  const [requestType, setRequestType] = useState("Due Date Extension");
  const [priority, setPriority] = useState("Normal");
  const [impactLevel, setImpactLevel] = useState("Internal Only");
  const [otherReason, setOtherReason] = useState("");
  const [reasonDetails, setReasonDetails] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Perpaulo Varca",
    department: "Development",
    position: "Developer",
    supervisor: "",
    contactNumber: "+63 900 000 0000",
    email: "perpaulo.varca@cybence.com",
    taskName: "",
    currentDueDate: "",
    requestedDueDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

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