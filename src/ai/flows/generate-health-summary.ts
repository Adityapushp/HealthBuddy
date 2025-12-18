'use server';

/**
 * @fileOverview A health summary generation AI agent.
 *
 * - generateHealthSummary - A function that handles the health summary generation process.
 * - GenerateHealthSummaryInput - The input type for the generateHealthSummary function.
 * - GenerateHealthSummaryOutput - The return type for the generateHealthSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHealthSummaryInputSchema = z.object({
  medications: z.string().describe('A list of medications the user is taking, including dosage and schedule.'),
  appointments: z.string().describe('A list of appointments the user has scheduled or attended, including date, time, and doctor.'),
});
export type GenerateHealthSummaryInput = z.infer<typeof GenerateHealthSummaryInputSchema>;

const GenerateHealthSummaryOutputSchema = z.object({
  summary: z.string().describe('A comprehensive summary of the user\'s health information, including medications and appointments.'),
});
export type GenerateHealthSummaryOutput = z.infer<typeof GenerateHealthSummaryOutputSchema>;

export async function generateHealthSummary(input: GenerateHealthSummaryInput): Promise<GenerateHealthSummaryOutput> {
  return generateHealthSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHealthSummaryPrompt',
  input: {schema: GenerateHealthSummaryInputSchema},
  output: {schema: GenerateHealthSummaryOutputSchema},
  prompt: `You are a medical assistant tasked with summarizing a patient\'s health information for their doctor.

  Here is the patient\'s medication list:
  {{medications}}

  Here is the patient\'s appointment list:
  {{appointments}}

  Please generate a concise and comprehensive summary of the patient\'s health information, including medications and appointments, that can be easily shared with their doctor for better consultations.`,
});

const generateHealthSummaryFlow = ai.defineFlow(
  {
    name: 'generateHealthSummaryFlow',
    inputSchema: GenerateHealthSummaryInputSchema,
    outputSchema: GenerateHealthSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
