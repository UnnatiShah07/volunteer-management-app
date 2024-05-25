import { createSlice } from "@reduxjs/toolkit";

export type EventType = {
  id?: string;
  name: string;
  date: string;
  location: string;
  description: string;
  volunteerRoles: { id: number; role: string; requiredNumber: number }[];
  registeredVolunteer: string[];
};

export type EventStateTypes = {
  isLoading: Boolean;
  events: EventType[];
  error: String | null;
};

const initialState: EventStateTypes = {
  isLoading: false,
  events: [
    {
      id: "1",
      name: "Community Clean-Up",
      date: "2024-06-15",
      location: "Central Park",
      description: "A community event to clean up the park and surrounding areas.",
      volunteerRoles: [
        { id: 1, role: "Trash Collector", requiredNumber: 50 },
        { id: 2, role: "Recycling Coordinator", requiredNumber: 20 },
        { id: 3, role: "Event Organizer", requiredNumber: 10 },
      ],
      registeredVolunteer: ["V01", "V03"],
    },
    {
      id: "2",
      name: "Food Drive",
      date: "2024-07-10",
      location: "Community Center",
      description: "Collecting and distributing food to local families in need.",
      volunteerRoles: [
        { id: 1, role: "Food Collector", requiredNumber: 30 },
        { id: 2, role: "Distribution Assistant", requiredNumber: 25 },
        { id: 3, role: "Logistics Coordinator", requiredNumber: 15 },
      ],
      registeredVolunteer: ["V02", "V04"],
    },
    {
      id: "3",
      name: "Charity Run",
      date: "2024-08-20",
      location: "Downtown",
      description: "A 5K run to raise funds for local charities.",
      volunteerRoles: [
        { id: 1, role: "Runner Registration", requiredNumber: 15 },
        { id: 2, role: "Water Station Attendant", requiredNumber: 20 },
        { id: 3, role: "Finish Line Coordinator", requiredNumber: 10 },
      ],
      registeredVolunteer: ["V01", "V05"],
    },
    {
      id: "4",
      name: "Blood Donation Camp",
      date: "2024-09-05",
      location: "Health Center",
      description: "Organizing a blood donation camp to help the local hospital.",
      volunteerRoles: [
        { id: 1, role: "Donor Registration", requiredNumber: 10 },
        { id: 2, role: "Nurse", requiredNumber: 5 },
        { id: 3, role: "Refreshment Coordinator", requiredNumber: 7 },
      ],
      registeredVolunteer: ["V02", "V04"],
    },
    {
      id: "5",
      name: "Art and Craft Fair",
      date: "2024-10-25",
      location: "Exhibition Hall",
      description: "An exhibition and sale of local art and crafts.",
      volunteerRoles: [
        { id: 1, role: "Stall Setup", requiredNumber: 20 },
        { id: 2, role: "Customer Assistance", requiredNumber: 30 },
        { id: 3, role: "Event Promotion", requiredNumber: 10 },
      ],
      registeredVolunteer: ["V03", "V05"],
    },
  ],
  error: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEventData: (state, action) => {
      const { eventId, updatedEvent } = action.payload;
      state.events = [...state.events].map((event) => (event.id === eventId ? updatedEvent : event));
    },
    deleteEvent: (state, action) => {
      const { eventId } = action.payload;
      state.events = [...state.events].filter((event) => event.id !== eventId);
    },
    setUpdatedEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addEvent, updateEventData, deleteEvent, setUpdatedEvents } = eventSlice.actions;
