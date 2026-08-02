import { useState, type FormEvent } from 'react';
import { Settings as User, Bell, Shield, CheckCircle2, AlertCircle, Camera, Save, Key } from 'lucide-react';

type Tab = 'profile' | 'notifications' | 'security';

type ProfileSettings = {
  fullName: string;
  role: string;
  email: string;
  department: string;
};

type NotificationSettings = {
  push: boolean;
  weeklyDigest: boolean;
  emailAlerts: boolean;
};

type SecuritySettings = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form States
  const [profile, setProfile] = useState<ProfileSettings>({
    fullName: 'Daniel Sardalla',
    role: 'Intern',
    email: 'daniel.sardalla@cybence.com',
    department: 'Development',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    push: false,
    weeklyDigest: true,
    emailAlerts: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showFeedback('Profile information updated successfully!');
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      showFeedback('New passwords do not match.', 'error');
      return;
    }
    if (security.newPassword.length < 6) {
      showFeedback('Password must be at least 6 characters long.', 'error');
      return;
    }
    showFeedback('Password changed successfully!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showFeedback('Notification preferences updated!');
      return updated;
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-32px)] p-6 sm:p-8 flex flex-col font-sans text-slate-800">
      
      {/* Prominent Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
              <p className="text-sm text-slate-500 font-medium">
                Manage your account settings, preferences, and security configurations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 shadow-xs border transition-all ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          {feedback.message}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / CENTER: Settings Form Section (8 Columns) */}
        <div className="lg:col-span-20 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-[#106fb8] border border-blue-100'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-800">Profile Information</h2>
                <p className="text-xs text-slate-500">Update your public information and account details.</p>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-[#106fb8] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-[#106fb8]/20">
                  DS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">User Avatar</h3>
                  <p className="text-xs text-slate-500 mb-2">JPG, GIF or PNG. Max size 2MB.</p>
                  <button
                    type="button"
                    onClick={() => alert('Avatar upload picker opened.')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">System Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#106fb8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#106fb8]/30 transition-all hover:bg-[#0d5ca0] hover:-translate-y-0.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-800">Notification Preferences</h2>
                <p className="text-xs text-slate-500">Choose how and when you want to receive system alerts.</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'push' as const, label: 'Browser Push Notifications', desc: 'Receive real-time pop-ups for critical updates.' },
                  { key: 'weeklyDigest' as const, label: 'Weekly Activity Summary', desc: 'Get a weekly summary report of completed tasks & logs.' },
                ].map((option) => (
                  <div
                    key={option.key}
                    onClick={() => toggleNotification(option.key)}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{option.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications[option.key]}
                      onChange={() => {}}
                      className="w-5 h-5 accent-[#106fb8] rounded cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Security Settings */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-800">Security & Credentials</h2>
                <p className="text-xs text-slate-500">Manage your password and security settings.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Current Password</label>
                  <input
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#106fb8] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#106fb8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#106fb8]/30 transition-all hover:bg-[#0d5ca0] hover:-translate-y-0.5 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}