import { useFormik } from "formik";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { addEvent } from "../redux/eventSlice";

export const Events = () => {
  const [volunteerRoles, setVolunteerRoles] = useState([1]);

  const dispatch = useAppDispatch();
  // const { events } = useAppSelector((state) => state.events);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      location: "",
      description: "",
      volunteerRoles: [{ id: 1, role: "", requiredNumber: 0 }],
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(addEvent(values));
      resetForm();
      setVolunteerRoles([1]);
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

  return (
    <div className="main-container">
      <div className="sub-container">
        <h4>Add New Event</h4>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
