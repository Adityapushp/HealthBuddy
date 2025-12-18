"use client";

import { generateHealthSummary } from "@/ai/flows/generate-health-summary";
import type { Appointment, Medication } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Clipboard, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from 'date-fns';

interface HealthSummaryProps {
  appointments: Appointment[];
  medications: Medication[];
}

export function HealthSummary({ appointments, medications }: HealthSummaryProps) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary("");
    try {
      if (appointments.length === 0 && medications.length === 0) {
        toast({
          variant: "destructive",
          title: "No Data Available",
          description: "Please add appointments or medications first.",
        });
        return;
      }

      const appointmentsString = appointments
        .map(appt => `- Appointment with ${appt.doctor} (${appt.specialty}) on ${format(appt.date, 'yyyy-MM-dd')}. Notes: ${appt.notes || 'N/A'}`)
        .join('\n');
      
      const medicationsString = medications
        .map(med => `- ${med.name} (${med.dosage}), taken ${med.frequency}. Notes: ${med.notes || 'N/A'}`)
        .join('\n');

      const result = await generateHealthSummary({
        appointments: appointmentsString || "No appointments.",
        medications: medicationsString || "No medications.",
      });

      setSummary(result.summary);
      toast({
        title: "Summary Generated",
        description: "Your health summary is ready.",
      });
    } catch (error) {
      console.error("Failed to generate summary:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate health summary. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to Clipboard",
      description: "The summary has been copied.",
    });
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-accent">AI Health Summary</CardTitle>
        </div>
        <CardDescription>Generate a summary for your doctor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generating..." : "Generate Summary"}
        </Button>

        {summary && (
          <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Your Summary</h4>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy summary</span>
              </Button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
