import { createSlice } from "@reduxjs/toolkit";

export type VolunteerType = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  availabilityDays: string[];
  preferedTime: string[];
  skills: string;
  areaOfInterest: string[];
};

export type VolunteerStateTypes = {
  isLoading: Boolean;
  volunteers: VolunteerType[];
  error: String | null;
};

const initialState: VolunteerStateTypes = {
  isLoading: false,
  //   volunteers: JSON.parse(localStorage.getItem("volunteers") as string),
  volunteers: [
    {
      id: "V01",
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "555-1234",
      address: "123 Elm St, Springfield, IL, 62701",
      availabilityDays: ["Monday", "Wednesday", "Friday"],
      preferedTime: ["Morning", "Afternoon"],
      skills: "Event Planning, Teaching",
      areaOfInterest: ["Education", "Community Service"],
    },
    {
      id: "V02",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "555-5678",
      address: "456 Oak St, Springfield, IL, 62702",
      availabilityDays: ["Tuesday", "Thursday"],
      preferedTime: ["Evening"],
      skills: "First Aid, Childcare",
      areaOfInterest: ["Healthcare", "Youth Programs"],
    },
    {
      id: "V03",
      name: "Sam Brown",
      email: "sambrown@example.com",
      phoneNumber: "555-8765",
      address: "789 Pine St, Springfield, IL, 62703",
      availabilityDays: ["Monday", "Tuesday", "Friday"],
      preferedTime: ["Morning"],
      skills: "Cooking, Fundraising",
      areaOfInterest: ["Community Service", "Food Programs"],
    },
    {
      id: "V04",
      name: "Lisa Johnson",
      email: "lisajohnson@example.com",
      phoneNumber: "555-4321",
      address: "321 Maple St, Springfield, IL, 62704",
      availabilityDays: ["Wednesday", "Thursday", "Saturday"],
      preferedTime: ["Afternoon", "Evening"],
      skills: "Graphic Design, Social Media",
      areaOfInterest: ["Marketing", "Event Planning"],
    },
    {
      id: "V05",
      name: "Michael Lee",
      email: "michaellee@example.com",
      phoneNumber: "555-9101",
      address: "654 Cedar St, Springfield, IL, 62705",
      availabilityDays: ["Saturday", "Sunday"],
      preferedTime: ["Morning", "Afternoon"],
      skills: "Teaching, Mentoring",
      areaOfInterest: ["Education", "Youth Programs"],
    },
  ],
  error: null,
};

export const volunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
    addVolunteer: (state, action) => {
      state.volunteers.push(action.payload);
      //   localStorage.setItem("volunteers", JSON.stringify(state.volunteers));
    },
    updateVolunteerData: (state, action) => {
      const { volunteerId, updatedVolunteer } = action.payload;
      state.volunteers = [...state.volunteers].map((voln) => (voln.id === volunteerId ? updatedVolunteer : voln));
      //   localStorage.setItem("volunteers", JSON.stringify(state.volunteers));
    },
    deleteVolunteer: (state, action) => {
      const { volunteerId } = action.payload;
      state.volunteers = [...state.volunteers].filter((voln) => voln.id !== volunteerId);
      //   localStorage.setItem("volunteers", JSON.stringify(state.volunteers));
    },
  },
  extraReducers: (builder) => {},
});

export const { addVolunteer, updateVolunteerData, deleteVolunteer } = volunteerSlice.actions;
