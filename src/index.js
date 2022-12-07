import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentDayView } from "./AppointmentDayView";
import { sampleAppointments } from "./sampleData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentDayView appointments={sampleAppointments} />
);
