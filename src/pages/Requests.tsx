import { useState, type FormEvent } from "react";

export default function RequestPage() {
  const [requestType, setRequestType] = useState("Due Date Extension");
  const [otherReason, setOtherReason] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Perpaulo Varca",
    department: "",
    position: "",
    supervisor: "",
    contactNumber: "",
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
    <div className="p-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Request Form</h1>
        <p className="text-sm text-slate-500">Submit a formal request for a due date extension or task change.</p>
      </div>

      {/* Success Notification Banner */}
      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          Request submitted successfully and forwarded to your supervisor!
        </div>
      )}

      {/* Main Card Container */}
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-800">Task Request Form</h2>
          <p className="text-sm text-slate-500">Please fill out all required fields accurately.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Left Side: Employee Information */}
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-800 pb-1 border-b border-slate-100">
                1. Employee Information
              </h3>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Department
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  >
                    <option value="">Select department</option>
                    <option value="Operations">Operations</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Management">Management</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Position
                  </label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  >
                    <option value="">Select position</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="QA Specialist">QA Specialist</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+63 900 000 0000"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Right Side: Request Details, Dates & Submit Button */}
            <div className="space-y-5 lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="font-semibold text-slate-800 pb-1 border-b border-slate-100">
                  2. Request Details
                </h3>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Task Creator
                  </label>
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
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Task Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., UI Design Update"
                    value={formData.taskName}
                    onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Request Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Due Date Extension",
                      "Revision of Task",
                      "Other",
                    ].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm cursor-pointer transition ${
                          requestType === type 
                            ? 'border-[#106fb8] bg-blue-50/40 text-[#106fb8] font-medium' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="requestType"
                          value={type}
                          checked={requestType === type}
                          onChange={(e) => setRequestType(e.target.value)}
                          className="text-[#106fb8] focus:ring-[#106fb8]"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Conditional "Please Specify" input field */}
                {requestType === "Other" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Please Specify Reason
                    </label>
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Current Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.currentDueDate}
                      onChange={(e) => setFormData({ ...formData, currentDueDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Requested Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.requestedDueDate}
                      onChange={(e) => setFormData({ ...formData, requestedDueDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action placed at the bottom right */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-2xl bg-[#106fb8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}