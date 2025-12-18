"use client";

import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, User, BriefcaseMedical, Calendar as CalendarIconList } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const appointmentSchema = z.object({
  doctor: z.string().min(1, "Doctor's name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  date: z.date({ required_error: "Appointment date is required" }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentsProps {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

export function Appointments({ appointments, addAppointment }: AppointmentsProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      doctor: "",
      specialty: "",
      notes: "",
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    addAppointment(data);
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${data.doctor} has been added.`,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <CalendarIconList className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline">Appointments</CardTitle>
            </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor's Name</Label>
                  <Input id="doctor" {...form.register("doctor")} placeholder="Dr. John Doe" />
                  {form.formState.errors.doctor && <p className="text-sm text-destructive">{form.formState.errors.doctor.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input id="specialty" {...form.register("specialty")} placeholder="e.g., Cardiologist" />
                   {form.formState.errors.specialty && <p className="text-sm text-destructive">{form.formState.errors.specialty.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Date</Label>
                    <Controller
                        name="date"
                        control={form.control}
                        render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        )}
                    />
                    {form.formState.errors.date && <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" {...form.register("notes")} placeholder="e.g., Follow-up visit" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Schedule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>View and manage your upcoming appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt.id} className="flex items-start gap-4 p-3 rounded-lg border bg-muted/20">
                <div className="flex-shrink-0">
                    <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                        <span className="text-lg font-bold">{format(appt.date, 'd')}</span>
                        <span className="text-xs -mt-1">{format(appt.date, 'MMM')}</span>
                    </div>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-foreground flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/> {appt.doctor}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2"><BriefcaseMedical className="h-4 w-4 text-muted-foreground"/> {appt.specialty}</p>
                  {appt.notes && <p className="text-sm mt-1 text-muted-foreground italic">"{appt.notes}"</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No appointments scheduled.</p>
              <p className="text-sm text-muted-foreground">Click 'New' to add one.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
