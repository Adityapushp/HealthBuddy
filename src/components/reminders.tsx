"use client";

import type { Appointment, Medication } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Calendar, Pill } from "lucide-react";
import { isToday, format } from "date-fns";

interface RemindersProps {
  appointments: Appointment[];
  medications: Medication[];
}

export function Reminders({ appointments, medications }: RemindersProps) {
  const todayAppointments = appointments.filter((appt) => isToday(appt.date));

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-accent">Today's Reminders</CardTitle>
        </div>
        <CardDescription>Your health schedule for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayAppointments.length === 0 && medications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reminders for today.</p>
              <p className="text-sm text-muted-foreground">Enjoy your day!</p>
            </div>
          ) : (
            <>
              {todayAppointments.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground"/> Appointments</h3>
                  <ul className="space-y-2">
                    {todayAppointments.map((appt) => (
                      <li key={appt.id} className="text-sm p-2 bg-muted/50 rounded-md">
                        <strong>{appt.doctor}</strong> ({appt.specialty}) at{" "}
                        <strong>{format(appt.date, "p")}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {medications.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 mt-4 flex items-center gap-2"><Pill className="h-4 w-4 text-muted-foreground"/> Medications</h3>
                  <ul className="space-y-2">
                    {medications.map((med) => (
                      <li key={med.id} className="text-sm p-2 bg-muted/50 rounded-md">
                        <strong>{med.name}</strong> - {med.dosage}, {med.frequency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
