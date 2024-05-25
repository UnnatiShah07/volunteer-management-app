import { useState } from "react";
import { VolunteerType, useAppDispatch, useAppSelector } from "../redux";

export const Home = () => {
  const [summaryType, setSummaryType] = useState("volunteer");
  const [viewVolunteer, setViewVolunteer] = useState<VolunteerType | null>(null);
  const [viewEvent, setViewEvent] = useState<Record<string, any> | null>(null);

  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);
  const { volunteers } = useAppSelector((state) => state.volunteer);

  return (
    <div className="main-container">
      <select name="summary-type" id="summary-type" onChange={(e) => setSummaryType(e.target.value)} style={{ marginTop: "50px" }}>
        <option value="volunteer">Volunteer Summary</option>
        <option value="events">Events Summary</option>
      </select>
      {summaryType === "volunteer" ? (
        <>
          {" "}
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
                    <button onClick={() => setViewVolunteer(volunteer)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {viewVolunteer && (
            <div className="modal">
              <div className="sub-modal">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p onClick={() => setViewVolunteer(null)}>✖️</p>
                </div>
                <div>
                  <p>
                    <b>{viewVolunteer.name}</b>
                  </p>
                  <p>
                    <b>Email:</b> {viewVolunteer.email}
                  </p>
                  <p>
                    <b>Phone number:</b> {viewVolunteer.phoneNumber}
                  </p>
                  <p>
                    <b>Address:</b> {viewVolunteer.address}
                  </p>
                  <p>
                    <b>Availability:</b> {viewVolunteer.availabilityDays.join(", ")}
                  </p>
                  <p>
                    <b>Timing:</b> {viewVolunteer.preferedTime.join(", ")}
                  </p>
                  <p>
                    <b>Skills:</b> {viewVolunteer.skills}
                  </p>
                  <p>
                    <b>Area of Interest:</b> {viewVolunteer.areaOfInterest.join(", ")}
                  </p>
                  <p>
                    <b>Event Histroy</b>
                    <ul>
                      {viewVolunteer.eventHistory.map((eventId: string) => {
                        const event = events.find((evt) => evt.id === eventId);
                        return <li>{event?.name}</li>;
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
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
                    <button onClick={() => setViewEvent(event)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewEvent && (
            <div className="modal">
              <div className="sub-modal">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p onClick={() => setViewEvent(null)}>✖️</p>
                </div>
                <h3>{viewEvent.name}</h3>
                <p>
                  <b>Date:</b> {viewEvent.date}
                </p>
                <p>
                  <b>Location:</b> {viewEvent.location}
                </p>
                <p>
                  <b>Description:</b> {viewEvent.description}
                </p>
                <p>
                  <b>Required Roles</b>
                </p>
                <ul>
                  {viewEvent.volunteerRoles.map((role: any) => (
                    <li>
                      {role.role} - {role.requiredNumber}
                    </li>
                  ))}
                </ul>
                <p>
                  <b>Registered Volunteers</b>
                </p>
                <ul>
                  {viewEvent.registeredVolunteer.map((volunteerId: string) => {
                    const volunteer = volunteers.find((vol) => vol.id === volunteerId);
                    return <li>{volunteer?.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
