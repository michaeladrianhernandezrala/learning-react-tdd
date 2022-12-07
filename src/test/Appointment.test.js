import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import { Appointment, AppointmentDayView } from "../AppointmentDayView";

describe("Appointment", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it.skip("Renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Ashley");
  });

  it.skip("Renders another the customer first name", () => {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const twoAppointments = [
    { startAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

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
    const component = <AppointmentDayView appointments={twoAppointments} />;
    render(component);

    const listChildren = document.querySelectorAll("ol > li");

    expect(listChildren).toHaveLength(2);
  });

  it("Renders the time of each appointment", () => {
    const component = <AppointmentDayView appointments={twoAppointments} />;
    render(component);

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("Initially shows a message saying there are no appointments today", () => {
    const component = <AppointmentDayView appointments={[]} />;
    render(component);

    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today"
    );
  });

  it("Has a button element in each li", () => {
    const component = <AppointmentDayView appointments={twoAppointments} />;
    render(component);

    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it.skip("Renders another appointment when selected", () => {
    const component = <AppointmentDayView appointments={twoAppointments} />;
    render(component);

    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });
});
