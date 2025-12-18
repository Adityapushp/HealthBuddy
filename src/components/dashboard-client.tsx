"use client";

import type { Appointment, Medication } from "@/lib/types";
import { useState } from "react";
import { Appointments } from "./appointments";
import { Medications } from "./medications";
import { Reminders } from "./reminders";
import { HealthSummary } from "./health-summary";

const initialAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Evelyn Reed",
    specialty: "Cardiologist",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    notes: "Annual check-up.",
  },
  {
    id: "2",
    doctor: "Dr. Ben Carter",
    specialty: "Dermatologist",
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    notes: "Follow up on rash.",
  },
];

const initialMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once a day",
    notes: "Take in the morning.",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice a day",
    notes: "Take with meals.",
  },
];

export default function DashboardClient() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [...prev, { ...appointment, id: crypto.randomUUID() }].sort((a, b) => a.date.getTime() - b.date.getTime()));
  };

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    setMedications(prev => [...prev, { ...medication, id: crypto.randomUUID() }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Appointments appointments={appointments} addAppointment={addAppointment} />
        <Medications medications={medications} addMedication={addMedication} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <Reminders appointments={appointments} medications={medications} />
        <HealthSummary appointments={appointments} medications={medications} />
      </div>
    </div>
  );
}
