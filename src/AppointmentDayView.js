import React, { useState } from "react";
import { Appointment } from "./Appointment";

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const AppointmentDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startAt)}
            </button>
          </li>
        ))}
      </ol>

      {appointments.length === 0 ? (
        "There are no appointments scheduled for today"
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
