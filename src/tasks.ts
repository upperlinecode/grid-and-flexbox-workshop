export type Status =
  | "Not Started"
  | "In Progress"
  | "Awaiting Approval"
  | "Abandoned"
  | "Completed";
export type Priority = "High" | "Low" | "Critical" | "Medium";

export interface Task {
  taskName: string;
  owner: string;
  startDate: string;
  dueDate: string;
  description: string;
  priority: Priority;
  status: Status;
  budget: number;
  spent: number;
  remainingSpend: number;
}

export const taskKeys: string[] = [
  "taskName",
  "owner",
  "startDate",
  "dueDate",
  "description",
  "priority",
  "status",
  "budget",
  "spent",
  "remainingSpend",
];

export const allTasks: Task[] = [
  {
    taskName: "Tableware Rented",
    owner: "Camila H.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "We need dishes, flatware, napkins, and tablecloths - we won't need them after the banquet and we don't have a place to store them, so we'd rather rent than buy.",
    priority: "Critical",
    status: "Not Started",
    budget: 800,
    spent: 0,
    remainingSpend: 800,
  },
  {
    taskName: "Book Venue",
    owner: "Rashawn W.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-03-15T04:00:00.000Z",
    description:
      "Venue needs to seat at least 120 people, and the even runs 6-9pm. We need at least 6 additional hours for setup and 2 for tear-down, so we could make due with a 12-hour rental if we're speedy.",
    priority: "Critical",
    status: "In Progress",
    budget: 12000,
    spent: 500,
    remainingSpend: 11500,
  },
  {
    taskName: "Run of Show",
    owner: "Neda B.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "Minute-by-minute explanation of what needs to be done and in what order.",
    priority: "High",
    status: "Awaiting Approval",
    budget: 0,
    spent: 0,
    remainingSpend: 0,
  },
  {
    taskName: "Celebrity Guest Confirmed",
    owner: "Anthony D.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-04-01T04:00:00.000Z",
    description:
      "We'd like to invite a high-profile activist to the dinner free of charge, and could pay a $500 honorarium to the organization of their choice.",
    priority: "Low",
    status: "Abandoned",
    budget: 500,
    spent: 0,
    remainingSpend: 500,
  },
  {
    taskName: "Invitations Sent",
    owner: "Heather L.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-03-15T04:00:00.000Z",
    description: "What it says!",
    priority: "Critical",
    status: "Completed",
    budget: 100,
    spent: 80,
    remainingSpend: 20,
  },
  {
    taskName: "Wifi Tested",
    owner: "Camila H.",
    startDate: "2022-05-30T04:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "We need to make sure that wifi is functional as attendees usually ask for a wifi password. Not urgent as it's not needed for any of what we're doing, but worth confirming and possibly messaging around.",
    priority: "Medium",
    status: "Not Started",
    budget: 0,
    spent: 0,
    remainingSpend: 0,
  },
  {
    taskName: "Playlist Made",
    owner: "Anthony D.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-12T04:00:00.000Z",
    description:
      "Energy of the evening needs to be relaxed, mostly instrumental.",
    priority: "Low",
    status: "Awaiting Approval",
    budget: 0,
    spent: 0,
    remainingSpend: 0,
  },
  {
    taskName: "Centerpieces",
    owner: "Neda B.",
    startDate: "2022-02-01T05:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description: "Floral arrangements in the event color scheme please",
    priority: "Medium",
    status: "Not Started",
    budget: 600,
    spent: 1200,
    remainingSpend: -600,
  },
  {
    taskName: "Caterer Finalized",
    owner: "Rashawn W.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-04-15T04:00:00.000Z",
    description:
      "We need at least one vegetarian and one gluten and dairy free option please",
    priority: "Critical",
    status: "In Progress",
    budget: 10000,
    spent: 4000,
    remainingSpend: 6000,
  },
  {
    taskName: "Valet Run of Show",
    owner: "Chris O.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "We'll be in charge of parking, and we need a system that allows for easy in-and-out as some guests have articulated a need to arrive late and/or leave early.",
    priority: "High",
    status: "In Progress",
    budget: 0,
    spent: 0,
    remainingSpend: 0,
  },
  {
    taskName: "Speaker Vetted",
    owner: "Evelyn M.",
    startDate: "2022-05-01T04:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "We trust our speakers implicitly, but we also need legal to read over their remarks and let us know if there's anything we need to be prepared for or if there's any language they'd recommend changing.",
    priority: "Medium",
    status: "Not Started",
    budget: 0,
    spent: 0,
    remainingSpend: 0,
  },
  {
    taskName: "Guest Gifts",
    owner: "Anthony D.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-15T04:00:00.000Z",
    description:
      'We\'d like to send everyone home with a gift bag - the goal here is sentiment rather than luxury, so think less "everyone gets an iPad" and a little more "everyone gets a student note."',
    priority: "Medium",
    status: "In Progress",
    budget: 2000,
    spent: 2000,
    remainingSpend: 0,
  },
  {
    taskName: "Speaker Gifts",
    owner: "Mariana Z.",
    startDate: "2022-01-21T05:00:00.000Z",
    dueDate: "2022-05-31T04:00:00.000Z",
    description:
      "We'd like to give our keynote speaker as well as our volunteers soemthing a little more substantial. We're thinking about experiences like a massage or a nice dinner.",
    priority: "High",
    status: "In Progress",
    budget: 1700,
    spent: 1200,
    remainingSpend: 500,
  },
  {
    taskName: "Invitations Created",
    owner: "Neda B.",
    startDate: "2022-01-01T05:00:00.000Z",
    dueDate: "2022-02-15T05:00:00.000Z",
    description:
      'Printed invitations, personalized to our guest list with event details. Since we\'re waiting to book a venue, we can just say "an evening in SoHo" for now when it comes to location.',
    priority: "Critical",
    status: "Completed",
    budget: 500,
    spent: 700,
    remainingSpend: -200,
  },
];
