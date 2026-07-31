export interface Task {
  id: number;
  task: string;
  creator: string;
  createdOn: string;
  status: string;
  dueDate: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  taskId?: number | null;
  iconType: "alert" | "calendar" | "check" | "bell" | "clock" | "sparkles";
}

// Task data from Task_Board
export const taskGroups = [
  {
    title: "To Be Assigned",
    dotClass: "dot-pending",
    badgeClass: "badge-pending",
    tasks: [
      {
        id: 1,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
      {
        id: 2,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
    ],
  },
  {
    title: "To Do",
    dotClass: "dot-todo",
    badgeClass: "badge-todo",
    tasks: [
      {
        id: 3,
        task: "TASK 1",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
      {
        id: 4,
        task: "TASK 2",
        creator: "Mae",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
    ],
  },
  {
    title: "Ongoing",
    dotClass: "dot-progress",
    badgeClass: "badge-progress",
    tasks: [
      {
        id: 5,
        task: "TASK 1",
        creator: "Janina",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
      {
        id: 6,
        task: "TASK 2",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
    ],
  },
  {
    title: "Completed",
    dotClass: "dot-completed",
    badgeClass: "badge-done",
    tasks: [
      {
        id: 7,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
      {
        id: 8,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
    ],
  },
  {
    title: "Unfinished",
    dotClass: "dot-unfinished",
    badgeClass: "badge-unfinished",
    tasks: [
      {
        id: 9,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Unfinished",
        dueDate: "2026-07-21",
      },
      {
        id: 10,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Unfinished",
        dueDate: "2026-07-21",
      },
    ],
  },
];

// Calendar events
export const calendarEvents = [
  { date: 20, tasks: ["Review Project Proposal (2:00 PM)", "Team Sync & Standup (4:30 PM)"] },
  { date: 27, tasks: ["Sprint Review", "Planning Session"] },
  { date: 28, tasks: ["Client Presentation"] },
];

// Function to calculate days until date
const daysUntil = (dateString: string): number => {
  const today = new Date("2026-07-29");
  const targetDate = new Date(dateString);
  const diff = targetDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Generate notifications from tasks and events
export const generateNotifications = (): NotificationItem[] => {
  const notifications: NotificationItem[] = [];
  const today = new Date("2026-07-29");

  // Find tasks due today or tomorrow
  const allTasks = taskGroups.flatMap((group) => group.tasks);

  // Overdue and urgent tasks
  const overdueTasks = allTasks.filter((task) => {
    const daysLeft = daysUntil(task.dueDate);
    return daysLeft < 0 && task.status !== "Completed";
  });

  overdueTasks.slice(0, 1).forEach((task) => {
    notifications.push({
      id: notifications.length + 1,
      title: "Overdue task",
      message: `"${task.task}" from ${task.creator} is overdue.`,
      time: "Now",
      unread: true,
      taskId: task.id,
      iconType: "alert",
    });
  });

  // Tasks due today
  const dueTodayTasks = allTasks.filter((task) => daysUntil(task.dueDate) === 0 && task.status !== "Completed");
  dueTodayTasks.slice(0, 1).forEach((task) => {
    notifications.push({
      id: notifications.length + 1,
      title: "Task due today",
      message: `"${task.task}" assigned by ${task.creator} is due today.`,
      time: "3 hours ago",
      unread: true,
      taskId: task.id,
      iconType: "clock",
    });
  });

  // Upcoming tasks (within 3 days)
  const upcomingTasks = allTasks.filter((task) => {
    const daysLeft = daysUntil(task.dueDate);
    return daysLeft > 0 && daysLeft <= 3 && task.status !== "Completed";
  });

  upcomingTasks.slice(0, 1).forEach((task) => {
    const daysLeft = daysUntil(task.dueDate);
    notifications.push({
      id: notifications.length + 1,
      title: "Upcoming task",
      message: `"${task.task}" is due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}.`,
      time: `${daysLeft} day${daysLeft > 1 ? "s" : ""} away`,
      taskId: task.id,
      iconType: "calendar",
    });
  });

  // Recently completed tasks
  const recentlyCompleted = allTasks.filter((task) => task.status === "Completed");
  recentlyCompleted.slice(0, 1).forEach((task) => {
    notifications.push({
      id: notifications.length + 1,
      title: "Task completed",
      message: `"${task.task}" has been completed by ${task.creator}.`,
      time: "5 min ago",
      unread: true,
      taskId: task.id,
      iconType: "check",
    });
  });

  // Calendar events reminder
  const currentDate = today.getDate();
  const todaysEvents = calendarEvents.find((e) => e.date === currentDate);
  if (todaysEvents && todaysEvents.tasks.length > 0) {
    notifications.push({
      id: notifications.length + 1,
      title: "Today's events",
      message: `You have ${todaysEvents.tasks.length} event${todaysEvents.tasks.length > 1 ? "s" : ""} scheduled for today.`,
      time: "Just now",
      iconType: "sparkles",
    });
  }

  return notifications.length > 0
    ? notifications
    : [
        {
          id: 1,
          title: "All caught up",
          message: "No pending tasks or events.",
          time: "Just now",
          iconType: "bell",
        },
      ];
};
