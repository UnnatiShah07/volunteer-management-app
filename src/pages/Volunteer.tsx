import { useFormik } from "formik";
import { VolunteerType, addVolunteer, deleteVolunteer, updateVolunteerData, useAppDispatch, useAppSelector } from "../redux";
import { useState } from "react";
import { setUpdatedEvents } from "../redux/eventSlice";

export const Volunteer = () => {
  const [volunteerId, setVolunteerId] = useState<string>("");

  const dispatch = useAppDispatch();
  const { volunteers } = useAppSelector((state) => state.volunteer);
  const { events } = useAppSelector((state) => state.events);

  const initialValues: VolunteerType = {
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    availabilityDays: [],
    preferedTime: [],
    skills: "",
    areaOfInterest: [],
    eventHistory: [],
  };

  const handleAddVolunteer = () => {
    const { street, city, state, postalCode, country } = formik.values;
    const volunteer = {
      id: `V${volunteers.length + 1 > 9 ? volunteers.length + 1 : `0${volunteers.length + 1}`}`,
      address: `${street}, ${city} - ${postalCode}, ${state}, ${country}`,
      ...formik.values,
    };
    dispatch(addVolunteer(volunteer));
    let updatedEvents = [...events];
    formik.values.eventHistory.forEach((eventId) => {
      updatedEvents = updatedEvents.map((evt) => (evt.id === eventId ? { ...evt, registeredVolunteer: [...evt?.registeredVolunteer, volunteer.id] } : evt));
    });
    dispatch(setUpdatedEvents(updatedEvents));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => (volunteerId ? handleEditVolunteerData() : handleAddVolunteer()),
  });

  const fillDataOfVolunteer = (data: VolunteerType) => {
    data?.id && setVolunteerId(data?.id);
    formik.setValues(data);
  };

  const handleEditVolunteerData = () => {
    const { street, city, state, postalCode, country } = formik.values;
    const volunteer = {
      id: volunteerId,
      address: `${street}, ${city} - ${postalCode}, ${state}, ${country}`,
      ...formik.values,
    };
    dispatch(updateVolunteerData({ volunteerId, updatedVolunteer: volunteer }));
    formik.resetForm();
  };

  return (
    <div className="main-container">
      <div className="sub-container">
        <h4>Add Volunteer</h4>
        <form className="form" id="add-volunteer-form" onSubmit={formik.handleSubmit}>
          <div className="grid-item">
            <label htmlFor="">
              <b>Basic informations</b>
            </label>
            <div className="sub-form">
              <input type="text" placeholder="* Name" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} required />
              <input type="email" placeholder="* Email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
              <input type="tel" placeholder="* Phone Number" id="phoneNumber" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} required />
            </div>
          </div>

          <div className="grid-item">
            <label>
              <b>Address</b>
            </label>
            <div className="sub-form">
              <input type="text" placeholder="* Street Address" id="street" name="street" value={formik.values.street} onChange={formik.handleChange} required />
              <input type="text" id="city" name="city" placeholder="* City" value={formik.values.city} onChange={formik.handleChange} required />
              <input type="text" id="state" name="state" placeholder="* State/Province" value={formik.values.state} onChange={formik.handleChange} required />
              <input type="text" id="postalCode" name="postalCode" placeholder="* Postal Code" value={formik.values.postalCode} onChange={formik.handleChange} required />
              <input type="text" id="country" name="country" placeholder="* Country" value={formik.values.country} onChange={formik.handleChange} required />
            </div>
          </div>

          <div className="grid-item" style={{ gap: 0 }}>
            <label>
              <b>Availability</b>
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="monday" checked={formik.values.availabilityDays.includes("monday")} onChange={formik.handleChange} /> Monday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="tuesday" checked={formik.values.availabilityDays.includes("tuesday")} onChange={formik.handleChange} /> Tuesday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="wednesday" checked={formik.values.availabilityDays.includes("wednesday")} onChange={formik.handleChange} /> Wednesday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="thursday" checked={formik.values.availabilityDays.includes("thursday")} onChange={formik.handleChange} /> Thursday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="friday" checked={formik.values.availabilityDays.includes("friday")} onChange={formik.handleChange} /> Friday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="saturday" checked={formik.values.availabilityDays.includes("saturday")} onChange={formik.handleChange} /> Saturday
            </label>
            <label>
              <input type="checkbox" name="availabilityDays" value="sunday" checked={formik.values.availabilityDays.includes("sunday")} onChange={formik.handleChange} /> Sunday
            </label>
          </div>
          <div className="grid-item" style={{ gap: 0 }}>
            <label>
              <b>Time of Day</b>
            </label>
            <label>
              <input type="checkbox" name="preferedTime" value="morning" checked={formik.values.preferedTime.includes("morning")} onChange={formik.handleChange} /> Morning
            </label>
            <label htmlFor="">
              <input type="checkbox" name="preferedTime" value="afternoon" checked={formik.values.preferedTime.includes("afternoon")} onChange={formik.handleChange} /> Afternoon
            </label>
            <label htmlFor="">
              <input type="checkbox" name="preferedTime" value="evening" checked={formik.values.preferedTime.includes("evening")} onChange={formik.handleChange} /> Evening
            </label>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              <b>Skills</b>
            </label>
            <textarea name="skills" id="skills" value={formik.values.skills} onChange={formik.handleChange} />
          </div>

          <div>
            <label>
              <b>Areas of Interest:</b>
            </label>
            <select id="areaOfInterest" name="areaOfInterest" value={formik.values.areaOfInterest} onChange={formik.handleChange} multiple>
              <option value="education">Education</option>
              <option value="health-care">Health Care</option>
              <option value="community-service">Community Service</option>
            </select>
          </div>

          <div className="grid-item" style={{ gap: 0 }}>
            <label>
              <b>Events</b>
            </label>
            {events.map((event) => (
              <label>
                <input type="checkbox" name="eventHistory" value={event.id} checked={formik.values.eventHistory.includes(event?.id ?? "")} onChange={formik.handleChange} /> {event.name}
              </label>
            ))}
          </div>
          <button type="submit">{volunteerId ? "Edit" : "Add"} Volunteer</button>
        </form>

        <h4>Volunteers</h4>
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {volunteers?.map((volunteer) => (
              <tr>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phoneNumber}</td>
                <td>
                  <button onClick={() => fillDataOfVolunteer(volunteer)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => dispatch(deleteVolunteer({ volunteerId: volunteer?.id }))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
