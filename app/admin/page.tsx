"use client";

import { useEffect, useState } from "react";

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

const STORAGE_KEY = "utah-mediations-bookings";

const demoBookings: Booking[] = [
  {
    id: "demo-1",
    name: "Sample Request",
    email: "client@example.com",
    date: "2026-06-02",
    time: "9:00 AM - 5:00 PM",
    session: "Half-day mediation",
    format: "Zoom",
    notes: "Demo intake request. New submissions from the booking form appear here.",
    status: "Pending",
  },
];

function formatDisplayDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    setBookings(saved.length ? saved : demoBookings);
  }, []);

  function updateStatus(id: string, status: Booking["status"]) {
    const next = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking,
    );
    setBookings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Mediation Schedule</h1>
        </div>
        <a className="secondary-button" href="/">
          Back to Site
        </a>
      </header>

      <section className="admin-metrics" aria-label="Booking summary">
        <article>
          <span>Pending</span>
          <strong>{bookings.filter((item) => item.status === "Pending").length}</strong>
        </article>
        <article>
          <span>Confirmed</span>
          <strong>
            {bookings.filter((item) => item.status === "Confirmed").length}
          </strong>
        </article>
        <article>
          <span>Zoom</span>
          <strong>{bookings.filter((item) => item.format === "Zoom").length}</strong>
        </article>
      </section>

      <section className="admin-board">
        {bookings.map((booking) => (
          <article className="admin-card" key={booking.id}>
            <div>
              <span className={`status ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
              <h2>{booking.name}</h2>
              <p>{booking.email}</p>
            </div>
            <dl>
              <div>
                <dt>Date</dt>
                <dd>{formatDisplayDate(booking.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{booking.time}</dd>
              </div>
              <div>
                <dt>Session</dt>
                <dd>{booking.session}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{booking.format}</dd>
              </div>
            </dl>
            <p className="admin-notes">{booking.notes}</p>
            <div className="admin-actions">
              <button onClick={() => updateStatus(booking.id, "Confirmed")}>
                Confirm
              </button>
              <button onClick={() => updateStatus(booking.id, "Declined")}>
                Decline
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
