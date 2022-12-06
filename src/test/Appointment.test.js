import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import { Appointment } from "../Appointment";
import { AppointmentDayView } from "../AppointmentDayView";

describe("Appointment", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("Renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("Renders another the customer first name", () => {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("Renders a div with the right id", () => {
    const component = <AppointmentDayView appointments={[]} />;
    render(component);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("Renders an ol element to display appointments", () => {
    const today = new Date();
    const twoAppointments = [
      { startAt: today.setHours(12, 0) },
      { startAt: today.setHours(13, 0) },
    ];

    const component = <AppointmentDayView appointments={twoAppointments} />;
    render(component);

    const listChildren = document.querySelectorAll("ol > li");

    expect(listChildren).toHaveLength(2);
  });
});
