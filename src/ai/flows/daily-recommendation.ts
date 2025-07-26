
'use server';

/**
 * @fileOverview A daily mental health recommendation AI agent.
 *
 * - getDailyRecommendation - A function that generates a daily mental health recommendation.
 * - DailyRecommendationInput - The input type for the getDailyRecommendation function.
 * - DailyRecommendationOutput - The return type for the getDailyRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyRecommendationInputSchema = z.object({
  userInput: z.string().describe("The user's free-form text input about their feelings and needs."),
});
export type DailyRecommendationInput = z.infer<typeof DailyRecommendationInputSchema>;

const DailyRecommendationOutputSchema = z.object({
  feeling: z.string().describe("An empathetic and validating reflection based on the user's input text."),
  recommendation: z.string().describe("A brief and helpful personalized recommendation."),
  activity: z.string().describe("A practical activity for the user, including its name and a brief guide."),
});
export type DailyRecommendationOutput = z.infer<typeof DailyRecommendationOutputSchema>;

export async function getDailyRecommendation(input: DailyRecommendationInput): Promise<DailyRecommendationOutput> {
  return dailyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyRecommendationPrompt',
  input: {schema: DailyRecommendationInputSchema},
  output: {schema: DailyRecommendationOutputSchema},
  prompt: `You are a compassionate and insightful therapist. Your role is to analyze the user's free-form text, identify their emotions and needs, and respond with warmth, validation, and practical support.

User's input:
"{{{userInput}}}"

Based on the user's input, generate the following content in a warm, respectful, and non-judgmental tone.

**Output Format:**

1.  **🧠 Lo que estás sintiendo:** [Provide an empathetic reflection based on the text. Validate their feelings. Example: "Gracias por compartir cómo te sientes. Reconocerlo ya es un acto de valentía. Parece que estás lidiando con..."]
2.  **📘 Recomendación personalizada:** [Provide a brief, useful, and personalized recommendation based on validated techniques like conscious breathing, journaling, mindfulness, body movement, or emotional self-care.]
3.  **🎮 Actividad para ti:** [Suggest a brief, practical activity or mini-game tailored to their needs. Include a name and a short guide. Examples: "Ejercicio de respiración 4x4 para calmar la mente", "Reto de gratitud en 3 pasos", "Escribe 3 cosas que hiciste bien hoy", "Meditación guiada de 3 minutos para reconectar contigo mismo".]`,
});

const dailyRecommendationFlow = ai.defineFlow(
  {
    name: 'dailyRecommendationFlow',
    inputSchema: DailyRecommendationInputSchema,
    outputSchema: DailyRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
