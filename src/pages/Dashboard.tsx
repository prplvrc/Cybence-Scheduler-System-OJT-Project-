import logo from "../assets/cybence-logo.png";

const stats = [
  { label: "Scheduled tasks", value: "128", trend: "+12% from last week" },
  { label: "Team utilization", value: "86%", trend: "+4% efficiency" },
  { label: "Pending approvals", value: "14", trend: "6 need review" },
  { label: "Deliveries this week", value: "23", trend: "+3 urgent stays" },
];

const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const schedule = [
  {
    team: "Design Ops",
    members: "Mia · Rhea",
    monday: { title: "Landing page", subtitle: "Review · 09:00" },
    tuesday: { title: "Prototype", subtitle: "UI sync · 11:00" },
    wednesday: { title: "Brand update", subtitle: "Asset handoff · 14:00" },
    thursday: { title: "Motion board", subtitle: "Animation review · 10:30" },
    friday: { title: "Release prep", subtitle: "Stakeholder signoff · 16:00" },
  },
  {
    team: "Eng Delivery",
    members: "Jude · Lian",
    monday: { title: "Sprint planning", subtitle: "Roadmap sync · 08:30" },
    tuesday: { title: "API QA", subtitle: "Regression test · 13:00" },
    wednesday: { title: "Release build", subtitle: "Hotfix validation · 12:00" },
    thursday: { title: "Deploy checklist", subtitle: "Approval gate · 15:30" },
    friday: { title: "Monitoring", subtitle: "Incident review · 17:00" },
  },
  {
    team: "Support Desk",
    members: "Noah · Priya",
    monday: { title: "Queue triage", subtitle: "L1 handoff · 09:30" },
    tuesday: { title: "Client calls", subtitle: "Priority coverage · 10:00" },
    wednesday: { title: "Training", subtitle: "New ticket flow · 11:30" },
    thursday: { title: "Escalations", subtitle: "Ops review · 14:00" },
    friday: { title: "Wrap-up", subtitle: "Weekly report · 16:30" },
  },
];

type DashboardProps = {
  onOpenProfile: () => void;
};

function Dashboard({ onOpenProfile }: DashboardProps) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="Cybence logo" className="brand-logo" />
          <span>Cybence IT Solutions</span>
        </div>

        <div className="nav-section">
          <div className="nav-title">Workspace</div>
          <ul className="nav-list">
            <li className="nav-item active"> Dashboard</li>
            <li className="nav-item"> Task Board</li>
            <li className="nav-item"> Calendar</li>
            <li className="nav-item"> Request</li>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-title">Account</div>
          <ul className="nav-list">
            <li className="nav-item"> Settings</li>
            <li className="nav-item" onClick={onOpenProfile} style={{ cursor: 'pointer' }}> Profile</li>
            <li className="nav-item"> Logout</li>
          </ul>
        </div>

        <div style={{ flex: 1 }} />

        <div className="profile-footer" onClick={onOpenProfile} style={{ cursor: 'pointer' }}>
          <div className="avatar-pill">P</div>
          <div className="profile-info">
            <div className="profile-name">Perpaulo Varca</div>
            <div className="profile-role">Intern</div>
          </div>
        </div>
      </aside>

      <main className="content">
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div>
            <h1>Dashboard</h1>
            <div style={{ color: '#64748b', marginTop: 6 }}>Good Afternoon, Perpaulo!</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ textAlign: 'right', color: '#475569', fontSize: 12 }}>
              <div>July 20, 2026</div>
              <div style={{ fontWeight: 700 }}>12:00:00 PM</div>
            </div>
            <button className="primary-btn">+ NEW TASK</button>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', display: 'grid', placeItems: 'center', border: '1px solid #e5e7eb' }}>🔔</div>
          </div>
        </div>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-label">Total Task</div>
            <div className="stat-value">1</div>
            <div className="stat-trend" style={{ color: '#94a3b8', fontWeight: 600 }}>All works</div>
          </article>

          <article className="stat-card">
            <div className="stat-label">To do</div>
            <div className="stat-value">2</div>
            <div className="stat-trend" style={{ color: '#94a3b8', fontWeight: 600 }}>Not yet started</div>
          </article>

          <article className="stat-card">
            <div className="stat-label">Ongoing</div>
            <div className="stat-value">3</div>
            <div className="stat-trend" style={{ color: '#94a3b8', fontWeight: 600 }}>Active works</div>
          </article>

          <article className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value">4</div>
            <div className="stat-trend" style={{ color: '#94a3b8', fontWeight: 600 }}>Completed works</div>
          </article>
        </section>

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <div>
            <div className="board-card" style={{ marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>Weekly Activity</h3>
              <div style={{ height: 160, marginTop: 12, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                Chart placeholder
              </div>
            </div>

            <div className="board-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Recent Task</h3>
                <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>View Board →</a>
              </div>

              <ul style={{ marginTop: 12, padding: 0, listStyle: 'none', color: '#475569' }}>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 700 }}>Task 1</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>2026-07-06</div>
                </li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 700 }}>Task 2</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>2026-07-07</div>
                </li>
                <li style={{ padding: '10px 0' }}>
                  <div style={{ fontWeight: 700 }}>Task 3</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>2026-07-07</div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="board-card" style={{ marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>Task Status</h3>
              <div style={{ height: 160, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'conic-gradient(#10b981 0 50%, #3b82f6 50% 75%, #ef4444 75% 100%)' }} />
              </div>
            </div>

            <div className="board-card">
              <h3 style={{ margin: 0 }}>Team Overview</h3>
              <div style={{ marginTop: 12 }}>
                <div style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}><strong>Perpaulo</strong></div>
                <div style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Daniel</div>
                <div style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>Mae</div>
                <div style={{ padding: '8px 0' }}>Janina</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;