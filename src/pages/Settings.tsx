import { useState } from 'react';
import type { FormEvent } from 'react';

type Tab = 'profile' | 'notifications' | 'security';

type ProfileSettings = {
  fullName: string;
  role: string;
};

type NotificationSettings = {
  email: boolean;
  push: boolean;
  weeklyDigest: boolean;
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
    fullName: 'Perpaulo Varca',
    role: 'Intern',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    weeklyDigest: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs: Tab[] = ['profile', 'notifications', 'security'];
  
  const notificationOptions: Array<{ key: keyof NotificationSettings; label: string; desc: string }> = [
    { key: 'email', label: 'Email', desc: 'Receive instant task and workspace alerts via email.' },
    { key: 'push', label: 'Push', desc: 'Get browser push notifications for urgent updates.' },
    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary report of your activities.' },
  ];

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add API call or local state synchronization logic here
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
    // Add password update logic here
    showFeedback('Password changed successfully!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      // Optional: automatically save notification preferences here
      showFeedback('Notification preferences updated!');
      return updated;
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
      <p className="text-gray-500 mb-6">Manage your account settings and preferences.</p>

      {/* Global Feedback Banner */}
      {feedback && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium transition-all ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
              PV
            </div>
            <button 
              type="button" 
              onClick={() => alert('Avatar upload modal or picker can be opened here.')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition"
            >
              Change Avatar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={profile.fullName} 
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input 
                type="text" 
                value={profile.role} 
                disabled 
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Notifications Tab Content */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
          
          <div className="space-y-4">
            {notificationOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{option.label} Notifications</p>
                  <p className="text-sm text-gray-500">{option.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[option.key]}
                  onChange={() => toggleNotification(option.key)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === 'security' && (
        <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input 
                type="password" 
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input 
                type="password" 
                value={security.newPassword}
                onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                value={security.confirmPassword}
                onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}