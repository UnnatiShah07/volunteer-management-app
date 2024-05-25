import { useFormik } from "formik";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { EventType, addEvent, deleteEvent, updateEventData } from "../redux/eventSlice";

export const Events = () => {
  const [volunteerRoles, setVolunteerRoles] = useState<number[] | any[]>([1]);
  const [updateEventId, setUpdateEventId] = useState<string | any>("");

  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      location: "",
      description: "",
      volunteerRoles: [{ id: 1, role: "", requiredNumber: 0 }],
    },
    onSubmit: (values, { resetForm }) => {
      if (updateEventId) {
        dispatch(updateEventData({ eventId: updateEventId, updatedEvent: values }));
        resetForm();
        setVolunteerRoles([1]);
      } else {
        dispatch(addEvent({ id: events.length > 0 ? events.length + 1 : 1, ...values }));
        resetForm();
        setVolunteerRoles([1]);
      }
    },
  });

  const handleAddRole = () => {
    setVolunteerRoles((prev) => [...prev, prev.length + 1]);
    formik.setFieldValue("volunteerRoles", [...formik.values.volunteerRoles, { id: formik.values.volunteerRoles.length + 1, role: "", requiredNumber: 0 }]);
  };

  const handleUpdateRole = (field: string, value: string, id: number) => {
    formik.setFieldValue(
      "volunteerRoles",
      [...formik.values.volunteerRoles].map((role, i) => (role.id === id ? { ...role, [field]: value } : role))
    );
  };

  const handleRemoveRole = (id: number) => {
    setVolunteerRoles((prev) => [...prev].filter((item) => item !== id));
    formik.setFieldValue(
      "volunteerRoles",
      [...formik.values.volunteerRoles].filter((role, i) => role.id !== id)
    );
  };

  const handleDeleteEvent = (id: string | any) => {
    dispatch(deleteEvent({ eventId: id }));
  };

  const setValuesInForm = (event: EventType) => {
    setVolunteerRoles(event.volunteerRoles.map((role) => role.id));
    setUpdateEventId(event.id);
    formik.setValues(event);
  };

  const resetFormValues = () => {
    setVolunteerRoles([1]);
    setUpdateEventId(null);
    formik.resetForm();
  };

  return (
    <div className="main-container">
      <div className="sub-container">
        <h4>{updateEventId ? "Edit" : "Add New"} Event</h4>
        <form className="form" onSubmit={formik.handleSubmit}>
          <input type="text" name="name" placeholder="* Event Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
          <input type="date" name="date" placeholder="* Event Date" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
          <input type="text" name="location" placeholder="* Event Location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
          <textarea name="description" placeholder="* Event Description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

          {volunteerRoles?.map((role, index) => (
            <>
              <div className="grid-item">
                <label>Role</label>
                <input
                  type="text"
                  placeholder="Role"
                  name="role"
                  id="role"
                  value={formik.values.volunteerRoles[index]?.role}
                  onChange={(e) => handleUpdateRole("role", e.target.value, formik.values.volunteerRoles[index]?.id)}
                />
              </div>

              <div className="grid-item">
                <label style={{ display: "flex", justifyContent: "space-between" }}>
                  Number of required volunteer <b onClick={() => handleRemoveRole(formik.values.volunteerRoles[index]?.id)}>✖️</b>
                </label>
                <input
                  type="number"
                  name="requiredNumber"
                  id="requiredNumber"
                  value={formik.values.volunteerRoles[index]?.requiredNumber}
                  onChange={(e) => handleUpdateRole("requiredNumber", e.target.value, formik.values.volunteerRoles[index]?.id)}
                />
              </div>
            </>
          ))}

          <button type="button" onClick={handleAddRole}>
            Add Role
          </button>
          <button type="submit">{updateEventId ? "Edit" : "Submit"}</button>
          {updateEventId && <button onClick={resetFormValues}>Reset</button>}
        </form>

        <h4>Events</h4>
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>
                  <button onClick={() => setValuesInForm(event)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteEvent(event?.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
