
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
  feeling: z.string().describe("The user's answer to 'How do you feel today?'."),
  preference: z.string().describe("The user's answer to 'What do you prefer to do to feel better?'."),
  time: z.string().describe("The user's answer to 'How much time can you dedicate today?'."),
  need: z.string().describe("The user's answer to 'What do you need today?'."),
  userInput: z.string().describe("The user's free-form text input about their feelings and needs."),
});
export type DailyRecommendationInput = z.infer<typeof DailyRecommendationInputSchema>;

const DailyRecommendationOutputSchema = z.object({
  emotionalState: z.string().describe("An empathetic reflection based on the survey and text input. Address the user in a warm, positive tone, like a kind therapist."),
  recommendation: z.string().describe("A brief, helpful, and personalized recommendation based on validated techniques."),
  suggestedActivity: z.string().describe("A practical activity or mini-game for the user, including its name, a brief guide, and its objective."),
});
export type DailyRecommendationOutput = z.infer<typeof DailyRecommendationOutputSchema>;

export async function getDailyRecommendation(input: DailyRecommendationInput): Promise<DailyRecommendationOutput> {
  return dailyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyRecommendationPrompt',
  input: {schema: DailyRecommendationInputSchema},
  output: {schema: DailyRecommendationOutputSchema},
  prompt: `You are a compassionate and insightful therapist. Your role is to analyze the user's survey responses and their free-form text to identify their emotions and needs. Respond with warmth, validation, and practical support.

**User's Survey Answers:**
- Feeling today: {{{feeling}}}
- Preferred activity: {{{preference}}}
- Available time: {{{time}}}
- Needs today: {{{need}}}

**User's free-form text:**
"{{{userInput}}}"

Based on all the user's input, generate the following content in a warm, respectful, and non-judgmental tone.

**Output Format:**

1.  **Tu estado emocional:** [Provide a warm, empathetic reflection based on both the survey and the text. Validate their feelings. Example: "Gracias por compartir cómo te sientes. Parece que hoy buscas calma y es genial que te des este espacio. Reconocerlo ya es un acto de valentía."]
2.  **Recomendación para ti:** [Provide a brief, useful, and personalized recommendation based on their needs, preferences, and available time. Use validated techniques like mindfulness, breathing, journaling, or gentle movement.]
3.  **Actividad sugerida:** [Suggest a brief, practical activity or mini-game tailored to their needs. Include a name, a short guide on how to do it, and its objective. The activity should be doable in the time they have available. Example: "Juego de Respiración 4x4: Inhala durante 4 segundos, sostén 4 segundos, exhala 4 segundos y espera 4 segundos. Repite 3 veces. Objetivo: Calmar tu sistema nervioso rápidamente."].`,
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

