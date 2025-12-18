"use client";

import type { Medication } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pill, PlusCircle, Beaker, Repeat } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  notes: z.string().optional(),
});

type MedicationFormValues = z.infer<typeof medicationSchema>;

interface MedicationsProps {
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
}

export function Medications({ medications, addMedication }: MedicationsProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      notes: "",
    },
  });

  const onSubmit = (data: MedicationFormValues) => {
    addMedication(data);
    toast({
      title: "Medication Added",
      description: `${data.name} has been added to your list.`,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Pill className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline">Medications</CardTitle>
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
                <DialogTitle>Add New Medication</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Medication Name</Label>
                  <Input id="name" {...form.register("name")} placeholder="e.g., Paracetamol" />
                  {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" {...form.register("dosage")} placeholder="e.g., 500mg" />
                  {form.formState.errors.dosage && <p className="text-sm text-destructive">{form.formState.errors.dosage.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Input id="frequency" {...form.register("frequency")} placeholder="e.g., Twice a day" />
                  {form.formState.errors.frequency && <p className="text-sm text-destructive">{form.formState.errors.frequency.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" {...form.register("notes")} placeholder="e.g., Take with food" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Keep track of your current medications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.length > 0 ? (
            medications.map((med) => (
                <div key={med.id} className="flex items-start gap-4 p-3 rounded-lg border bg-muted/20">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                        <Pill className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-foreground">{med.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1.5"><Beaker className="h-4 w-4"/> {med.dosage}</span>
                            <span className="flex items-center gap-1.5"><Repeat className="h-4 w-4"/> {med.frequency}</span>
                        </div>
                         {med.notes && <p className="text-sm mt-1 text-muted-foreground italic">"{med.notes}"</p>}
                    </div>
                </div>
            ))
          ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No medications added yet.</p>
               <p className="text-sm text-muted-foreground">Click 'New' to add one.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
