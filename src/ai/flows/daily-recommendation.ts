
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
  mood: z.string().describe('The user\'s current feeling (e.g., Calm, Anxious, Sad, Irritated).'),
  activityPreference: z.string().describe('The user\'s preference for active or calm activities.'),
  copingPreference: z.string().describe('The user\'s preferred coping mechanism (e.g., writing, moving, breathing, reflecting).'),
  timeAvailable: z.string().describe('The amount of time the user has available (e.g., 2, 5, or 10 minutes).'),
});
export type DailyRecommendationInput = z.infer<typeof DailyRecommendationInputSchema>;

const DailyRecommendationOutputSchema = z.object({
  emotionalProfile: z.string().describe("A brief, positive, and empathetic description of the user's emotional profile based on their answers."),
  recommendation: z.string().describe('A practical and motivating personalized recommendation for managing anxiety or stress.'),
  finalActivity: z.string().describe('A final activity including its name, how to do it, and its objective.'),
});
export type DailyRecommendationOutput = z.infer<typeof DailyRecommendationOutputSchema>;

export async function getDailyRecommendation(input: DailyRecommendationInput): Promise<DailyRecommendationOutput> {
  return dailyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyRecommendationPrompt',
  input: {schema: DailyRecommendationInputSchema},
  output: {schema: DailyRecommendationOutputSchema},
  prompt: `You are an empathetic and expert mental wellness coach. Your task is to provide a warm, motivating, and clear experience for users looking to manage anxiety and stress.

Analyze the user's survey responses to generate personalized and supportive content.

User's Survey Responses:
1.  How are you feeling today? {{{mood}}}
2.  Do you prefer active or calm activities? {{{activityPreference}}}
3.  What helps you process emotions? {{{copingPreference}}}
4.  How much time do you have? {{{timeAvailable}}} minutes

Based on these answers, generate the following content in a warm, easy-to-understand, and motivating tone, suitable for a wellness app.

**Output Format:**

1.  **🧠 Tu perfil de hoy:** [Provide a brief, positive, and empathetic description of the user's emotional state. Example: "Hoy pareces estar buscando un momento de calma y claridad. Eso demuestra que te estás priorizando, lo cual es un gran paso."]
2.  **📘 Recomendación del día:** [Generate a practical, evidence-based recommendation for managing anxiety or stress, tailored to the user's profile. Use validated techniques like mindfulness, conscious breathing, journaling, positive visualization, or gentle body movement.]
3.  **🎮 Actividad recomendada:** [Propose a brief therapeutic mini-game or practical exercise adapted to the user's preferences. It should include a name, clear instructions on how to do it, and its objective. Examples: guided breathing, positive affirmations, gratitude challenge, guided meditation, or interactive breathing game.]`,
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
