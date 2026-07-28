import { useState, type FormEvent } from "react";

export default function RequestPage() {
  const [leaveType, setLeaveType] = useState("Personal Leave");
  const [otherReason, setOtherReason] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Perpaulo Varca",
    supervisor: "",
    contactNumber: "",
    email: "perpaulo.varca@cybence.com",
    startDate: "",
    endDate: "",
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
        <p className="text-sm text-slate-500">Submit an official employee leave application.</p>
      </div>

      {/* Success Notification Banner */}
      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          Leave request submitted successfully and forwarded to your supervisor!
        </div>
      )}

      {/* Main Card Container */}
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-800">Employee Leave Request Form</h2>
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Supervisor / Manager
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

            {/* Right Side: Leave Details, Dates & Submit Button */}
            <div className="space-y-5 lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="font-semibold text-slate-800 pb-1 border-b border-slate-100">
                  2. Leave Details
                </h3>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Leave Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Vacation Leave",
                      "Emergency Leave",
                      "Personal Leave",
                      "Other",
                    ].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm cursor-pointer transition ${
                          leaveType === type 
                            ? 'border-[#106fb8] bg-blue-50/40 text-[#106fb8] font-medium' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="leaveType"
                          value={type}
                          checked={leaveType === type}
                          onChange={(e) => setLeaveType(e.target.value)}
                          className="text-[#106fb8] focus:ring-[#106fb8]"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Conditional "Please Specify" input field */}
                {leaveType === "Other" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Please Specify Reason
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Maternity/Paternity Leave"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Leave Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Leave End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action placed at the bottom right */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="rounded-xl bg-[#106fb8] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c5e9f]"
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