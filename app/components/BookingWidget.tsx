"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  session: string;
  format: string;
  notes: string;
  status: "Pending" | "Confirmed" | "Declined";
};

function loadBookings(): Booking[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function getUnavailableDates(bookings: Booking[]) {
  return new Set(
    bookings
      .filter((booking) => booking.status === "Pending" || booking.status === "Confirmed")
      .map((booking) => booking.date),
  );
}
type IntakeField = {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  type?: "email" | "tel" | "text";
};
type BookingFeature = {
  icon: "calendar" | "clock" | "location" | "details";
  label: string;
};

const STORAGE_KEY = "utah-mediations-bookings";

const availableTimes = [
  "9:00 AM - 5:00 PM",
  "9:30 AM - 5:30 PM",
  "10:00 AM - 6:00 PM",
  "10:30 AM - 6:30 PM",
  "11:00 AM - 7:00 PM",
];
const locationOptions = [
  "Zoom",
  "Hunter Law, Fibernet Building, 1145 S 800 E, Orem, UT 84097",
  "1st Party Attorney's Office",
  "2nd Party Attorney's Office",
  "Other",
];
const bookingFeatures: BookingFeature[] = [
  { icon: "calendar", label: "Full-day mediation scheduling" },
  { icon: "clock", label: "Up to 8 hours reserved" },
  { icon: "location", label: "Zoom meetings are preferred" },
  { icon: "details", label: "Case and party details collected up front" },
];
const intakeFields: IntakeField[] = [
  { label: "Full Name", name: "name", required: true },
  {
    label: "Email:",
    name: "email",
    placeholder: "example@mail.com",
    required: true,
    type: "email",
  },
  {
    label: "Desired Location (ZOOM is Most Common)",
    name: "desiredLocation",
    defaultValue: locationOptions[0],
    options: locationOptions,
  },
  { label: "Type of Case", name: "caseType" },
  { label: "Case Number (if you have one)", name: "caseNumber" },
  { label: "First Party Name", name: "firstPartyName" },
  { label: "First Party Phone", name: "firstPartyPhone", type: "tel" },
  { label: "First Party Email", name: "firstPartyEmail", type: "email" },
  { label: "Attorney Name for First Party", name: "firstPartyAttorneyName" },
  {
    label: "Attorney Phone for First Party",
    name: "firstPartyAttorneyPhone",
    type: "tel",
  },
  {
    label: "Attorney Email for First Party",
    name: "firstPartyAttorneyEmail",
    type: "email",
  },
  {
    label: "Attorney's Assistant Name for First Party",
    name: "firstPartyAssistantName",
  },
  {
    label: "Attorney's Assistant Email for First Party",
    name: "firstPartyAssistantEmail",
    type: "email",
  },
  { label: "Second Party Name", name: "secondPartyName" },
  { label: "Second Party Phone", name: "secondPartyPhone", type: "tel" },
  { label: "Second Party Email", name: "secondPartyEmail", type: "email" },
  { label: "Second Party Attorney Name", name: "secondPartyAttorneyName" },
  {
    label: "Second Party Attorney Phone",
    name: "secondPartyAttorneyPhone",
    type: "tel",
  },
  {
    label: "Second Party Attorney Email",
    name: "secondPartyAttorneyEmail",
    type: "email",
  },
  {
    label: "Second Party Attorney's Assistant Name",
    name: "secondPartyAssistantName",
  },
  {
    label: "Second Party Attorney's Assistant Email",
    name: "secondPartyAssistantEmail",
    type: "email",
  },
  {
    label:
      "Any other details you want us to know? (For example, is this a 4-903 custody evaluation conference mediation, if third party support people are attending, we need their names and emails, etc.)",
    name: "otherDetails",
    multiline: true,
  },
];

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstCalendarDay = new Date(firstDay);
  firstCalendarDay.setDate(firstDay.getDate() - firstDay.getDay());

  const lastCalendarDay = new Date(lastDay);
  lastCalendarDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const days = [];
  const cursor = new Date(firstCalendarDay);

  while (cursor <= lastCalendarDay) {
    days.push({
      date: new Date(cursor),
      inMonth: cursor.getMonth() === month,
      value: toDateInputValue(cursor),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function getMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthKey(date: Date) {
  return date.getFullYear() * 12 + date.getMonth();
}

const MAX_MONTHS_AHEAD = 12;

function formatDisplayDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function FeatureIcon({ icon }: { icon: BookingFeature["icon"] }) {
  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
        <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 4h7l3 3v13H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M14 4v4h4M8 12h8M8 16h6" />
    </svg>
  );
}

function getIntakeNotes(form: FormData) {
  const noteLines = intakeFields
    .filter((field) => field.name !== "name" && field.name !== "email")
    .map((field) => `${field.label} ${String(form.get(field.name) ?? "")}`);
  const desiredOtherLocation = String(form.get("desiredOtherLocation") ?? "");

  if (desiredOtherLocation) {
    noteLines.push(`Other Desired Location: ${desiredOtherLocation}`);
  }

  noteLines.push(
    `Person filling out this form is the: ${String(form.get("submitterRole") ?? "")}`,
    `Direct phone number of person filling out this form: ${String(
      form.get("submitterPhone") ?? "",
    )}`,
  );

  return noteLines.join("\n");
}

export default function BookingWidget() {
  const todayValue = useMemo(() => toDateInputValue(new Date()), []);
  const minMonth = useMemo(() => startOfMonth(new Date()), []);
  const maxMonth = useMemo(() => {
    const limit = new Date();
    limit.setMonth(limit.getMonth() + MAX_MONTHS_AHEAD);
    return startOfMonth(limit);
  }, []);
  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()));
  const calendarDays = useMemo(() => getCalendarDays(monthDate), [monthDate]);
  const canGoPreviousMonth = getMonthKey(monthDate) > getMonthKey(minMonth);
  const canGoNextMonth = getMonthKey(monthDate) < getMonthKey(maxMonth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);
  const [desiredLocation, setDesiredLocation] = useState(locationOptions[0]);

  const unavailableDates = useMemo(() => getUnavailableDates(bookings), [bookings]);
  const selectedDateUnavailable =
    selectedDate !== null &&
    (selectedDate < todayValue || unavailableDates.has(selectedDate));
  const showAvailableTimes = selectedDate !== null;

  function changeMonth(monthOffset: number) {
    setMonthDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + monthOffset, 1),
    );
    setSelectedDate(null);
  }

  function selectDate(value: string) {
    setSelectedDate(value);
    setSelectedTime(availableTimes[0]);
  }

  useEffect(() => {
    function refreshBookings() {
      setBookings(loadBookings());
    }

    refreshBookings();
    window.addEventListener("storage", refreshBookings);
    return () => window.removeEventListener("storage", refreshBookings);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const booking: Booking = {
      id: crypto.randomUUID(),
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      date: String(form.get("date") ?? ""),
      time: String(form.get("time") ?? ""),
      session: "Full-day mediation",
      format: "Zoom",
      notes: getIntakeNotes(form),
      status: "Pending",
    };

    const existing = loadBookings();
    const nextBookings = [booking, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBookings));
    setBookings(nextBookings);
    setConfirmed(true);
    setShowDetails(false);
    setSelectedDate(null);
    setDesiredLocation(locationOptions[0]);
    event.currentTarget.reset();
  }

  return (
    <section className="booking-shell" id="booking" aria-label="Book mediation">
      <div className="booking-copy">
        <h2>Reserve Your Mediation Date</h2>
        <span className="booking-rule" aria-hidden="true" />
        <ul className="booking-features">
          {bookingFeatures.map((feature) => (
            <li key={feature.label}>
              <span className="feature-icon">
                <FeatureIcon icon={feature.icon} />
              </span>
              {feature.label}
            </li>
          ))}
        </ul>
      </div>

      <form className="booking-card" onSubmit={handleSubmit}>
        <div className="appointment-panel">
          <div className="monthly-calendar">
            <div className="booking-card-header">
              <h3>Select a Date &amp; Time</h3>
            </div>

            <div className="month-nav">
              <button
                aria-label="Previous month"
                disabled={!canGoPreviousMonth}
                onClick={() => changeMonth(-1)}
                type="button"
              >
                ‹
              </button>
              <strong>{getMonthLabel(monthDate)}</strong>
              <button
                aria-label="Next month"
                disabled={!canGoNextMonth}
                onClick={() => changeMonth(1)}
                type="button"
              >
                ›
              </button>
            </div>

            <div className="weekday-row" aria-hidden="true">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="month-grid" role="grid" aria-label="Select a date">
              {calendarDays.map(({ date, inMonth, value }) => {
                if (!inMonth) {
                  return (
                    <span
                      aria-hidden="true"
                      className="calendar-day-empty"
                      key={value}
                    />
                  );
                }

                const unavailable = value < todayValue || unavailableDates.has(value);

                return (
                  <button
                    aria-disabled={unavailable}
                    className={[
                      "calendar-day",
                      unavailable ? "unavailable-day" : "",
                      value === selectedDate && !unavailable ? "active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={unavailable}
                    key={value}
                    onClick={() => selectDate(value)}
                    type="button"
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="calendar-notes">
              <p>
                <strong>2026 Zoom only dates:</strong> Appointments between May 2
                and August 6 will only be available on Zoom.
              </p>
              <p>
                <strong>Party emails required: </strong>Please have both parties&apos;
                emails ready before you book. Appointments without both parties&apos;
                emails will not be approved.
              </p>
            </div>
          </div>

          <div className="available-times">
            {showAvailableTimes ? (
              <>
                <h4>Available Times</h4>
                {selectedDateUnavailable ? (
                  <p className="no-available-times">
                    No available times for this date.
                  </p>
                ) : (
                  <div className="time-stack">
                    {availableTimes.map((time) => (
                      <button
                        className={time === selectedTime ? "selected-time" : ""}
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        type="button"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="continue-button"
                  disabled={selectedDateUnavailable}
                  onClick={() => setShowDetails(true)}
                  type="button"
                >
                  Continue
                </button>
              </>
            ) : (
              <p className="select-date-prompt">Select a date to view available times.</p>
            )}
          </div>
        </div>

        {showDetails ? (
          <div
            aria-labelledby="booking-modal-title"
            aria-modal="true"
            className="booking-modal-backdrop"
            role="dialog"
          >
            <div className="booking-modal">
              <div className="booking-modal-header">
                <div>
                  <p className="eyebrow">Full-day mediation request</p>
                  <h3 id="booking-modal-title">Appointment Details</h3>
                </div>
                <button
                  aria-label="Close appointment form"
                  className="modal-close"
                  onClick={() => setShowDetails(false)}
                  type="button"
                >
                  ×
                </button>
              </div>

              <dl className="booking-summary">
                <div>
                  <dt>Mediator:</dt>
                  <dd className="mediator-summary">
                    <img src="/dave-mediator.jpg" alt="Dave Hunter" />
                    <span>
                      Dave Hunter
                      <small>(Up to 8 hours)</small>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Date:</dt>
                  <dd>{selectedDate ? formatDisplayDate(selectedDate) : ""}</dd>
                </div>
                <div>
                  <dt>Local Time:</dt>
                  <dd>{selectedTime}</dd>
                </div>
              </dl>

              <input name="date" type="hidden" value={selectedDate ?? ""} readOnly />
              <input name="time" type="hidden" value={selectedTime} readOnly />

              <div className="modal-field-grid">
                {intakeFields.map((field) => (
                  <label
                    className={field.multiline ? "modal-field-wide" : ""}
                    key={field.name}
                  >
                    {field.label}
                    {field.multiline ? (
                      <textarea name={field.name} />
                    ) : field.options ? (
                      <>
                        <select
                          name={field.name}
                          onChange={(event) => setDesiredLocation(event.target.value)}
                          value={desiredLocation}
                        >
                          {field.options.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        {desiredLocation === "Other" ? (
                          <input
                            className="other-location-field"
                            name="desiredOtherLocation"
                            placeholder="Other location"
                            required
                            type="text"
                          />
                        ) : null}
                      </>
                    ) : (
                      <input
                        defaultValue={field.defaultValue}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        type={field.type ?? "text"}
                      />
                    )}
                  </label>
                ))}
                <label>
                  Person filling out this form is the (select one):
                  <select name="submitterRole" required defaultValue="">
                    <option disabled value="">
                      Select one
                    </option>
                    <option>First Party</option>
                    <option>Second Party</option>
                    <option>Attorney for First Party</option>
                    <option>Attorney for Second Party</option>
                    <option>Assistant or Staff</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Direct phone number of person filling out this form:
                  <input name="submitterPhone" type="tel" />
                </label>
              </div>

              <button className="primary-button full" type="submit">
                Request Appointment
              </button>
            </div>
          </div>
        ) : null}

        {confirmed ? (
          <p className="success">Request saved. Check the admin dashboard.</p>
        ) : null}
      </form>
    </section>
  );
}
