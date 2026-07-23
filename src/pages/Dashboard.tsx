const stats = [
  { label: "Scheduled tasks", value: "128", trend: "+12% from last week" },
  { label: "Team utilization", value: "86%", trend: "+4% efficiency" },
  { label: "Pending approvals", value: "14", trend: "6 need review" },
  { label: "Deliveries this week", value: "23", trend: "+3 urgent stays" },
];

const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
          <div className="brand-badge">M</div>
          <span>Monday Flow</span>
        </div>

        <div className="nav-section">
          <div className="nav-title">Workspace</div>
          <ul className="nav-list">
            <li className="nav-item active">📊 Dashboard</li>
            <li className="nav-item">🗓 Scheduler</li>
            <li className="nav-item">👥 Team</li>
            <li className="nav-item">📦 Projects</li>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-title">Focus</div>
          <ul className="nav-list">
            <li className="nav-item">⚡ High priority</li>
            <li className="nav-item">🛠 Maintenance</li>
            <li className="nav-item">📈 Reporting</li>
          </ul>
        </div>
      </aside>

      <main className="content">
        <div className="topbar">
          <div>
            <h1>Weekly Scheduler</h1>
          </div>

          <div className="topbar-actions">
            <div className="search-box">Search schedule, team, or task</div>
            <div className="filter-chip">This week</div>
            <button className="primary-btn">+ Create board</button>
            <button className="profile-btn" onClick={onOpenProfile}>Profile</button>
          </div>
        </div>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-trend">{stat.trend}</div>
            </article>
          ))}
        </section>

        <section className="board-card">
          <div className="board-header">
            <h2>Team schedule board</h2>
            <div className="board-meta">
              <span className="tag">3 squads</span>
              <span className="tag">12 active items</span>
            </div>
          </div>

          <div className="scheduler-grid">
            <div className="grid-head">Team</div>
            {columns.map((day) => (
              <div key={day} className="grid-head">
                {day}
              </div>
            ))}

            {schedule.map((row) => (
              <>
                <div key={`${row.team}-label`} className="grid-row-label">
                  <div className="row-title">{row.team}</div>
                  <div className="row-subtitle">{row.members}</div>
                </div>
                <div className="grid-cell">
                  <div className="task-card">
                    <h4>{row.monday.title}</h4>
                    <small>{row.monday.subtitle}</small>
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="task-card">
                    <h4>{row.tuesday.title}</h4>
                    <small>{row.tuesday.subtitle}</small>
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="task-card">
                    <h4>{row.wednesday.title}</h4>
                    <small>{row.wednesday.subtitle}</small>
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="task-card">
                    <h4>{row.thursday.title}</h4>
                    <small>{row.thursday.subtitle}</small>
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="task-card">
                    <h4>{row.friday.title}</h4>
                    <small>{row.friday.subtitle}</small>
                  </div>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;