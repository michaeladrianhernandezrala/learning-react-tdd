import React from "react";
import { Appointment, AppointmentsDayView } from "../AppointmentsDayView";
import { toContainText } from "./matchers/toContainText";
import { click, initializateContainer, render } from "./reactTestExtensions";

describe("Appointment", () => {
  beforeEach(() => {
    initializateContainer();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    initializateContainer();
  });

  it("renders a div with the right id ", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("inititially shows a message saying theree are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today"
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const button = document.querySelectorAll("li > button")[1];
    click(button);
    expect(document.body.textContent).toContain("Jordan");
  });
});

describe("toContainerText matcher", () => {
  it("returns pass is true when text is found in the given DOM element", () => {
    const domElement = {
      textContent: "text to find",
    };

    const result = toContainText(domElement, "text to find");
    expect(result.pass).toBe(true);
  });

  // it("returns pass is true when text is found in the given DOM element", () => {
  //   const domElement = {
  //     textContent: "text to find",
  //   };

  //   const result = toContainText(domElement, "text to find");

  //   expect(stripTerminalColor(result.message())).toContain(
  //     `expect(element).toContainText("text to find")`
  //   );
  // });
});
