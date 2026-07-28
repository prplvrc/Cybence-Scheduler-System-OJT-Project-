import './Calendar.css'

const days = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Calendar() {
	return (
		<div className="calendar-page">
			<aside className="sidebar">
				<div className="brand">
					<div className="logo">Cy</div>
					<div className="brand-text">
						<div className="title">Cybence IT Solutions</div>
						<div className="subtitle">Scheduler</div>
					</div>
				</div>

				<nav className="nav">
					<ul>
						<li className="nav-item">Dashboard</li>
						<li className="nav-item">Task</li>
						<li className="nav-item active">Calendar</li>
						<li className="nav-item">Request</li>
					</ul>
				</nav>

				<div className="account">
					<div className="account-title">Account</div>
					<ul>
						<li>Settings</li>
						<li>Profile</li>
						<li>Logout</li>
					</ul>
				</div>

				<div className="user-mini">
					<div className="avatar">P</div>
					<div className="user-info">
						<div className="name">Perpaulo Varca</div>
						<div className="role">Intern</div>
					</div>
				</div>
			</aside>

			<main className="main-area">
				<header className="page-header">
					<h1>Calendar</h1>
					<div className="header-right">
						<div className="date">July 20, 2026</div>
						<div className="time">12:00:00 PM</div>
						<button className="new-task">+ NEW TASK</button>
					</div>
				</header>

				<section className="content">
					<div className="calendar-card">
						<div className="month-title">July 2026</div>
						<div className="weekdays">
							<div>Sat</div>
							<div>Mon</div>
							<div>Tues</div>
							<div>Wed</div>
							<div>Thurs</div>
							<div>Fri</div>
							<div>Sat</div>
						</div>

						<div className="days-grid">
							{days.map((d) => (
								<div key={d} className="day-cell">
									<span className="day-number">{d}</span>
								</div>
							))}
						</div>
					</div>

					<aside className="right-panel">
						<div className="tasks-list">
							<div className="task-day">July 27</div>

							<div className="task-card">
								<div className="task-title">Task 1</div>
								<div className="task-assignee">Assigned to:</div>
							</div>

							<div className="task-card">
								<div className="task-title">Task 1</div>
								<div className="task-assignee">Assigned to:</div>
							</div>

							<div className="task-day">July 28</div>
							<div className="task-card">
								<div className="task-title">Task 1</div>
								<div className="task-assignee">Assigned to:</div>
							</div>
						</div>
					</aside>
				</section>
			</main>
		</div>
	)
}

