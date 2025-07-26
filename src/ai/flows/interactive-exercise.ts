'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an interactive exercise.
 *
 * It includes:
 * - `generateInteractiveExercise`: A function to generate an interactive exercise based on a daily recommendation.
 * - `InteractiveExerciseInput`: The input type for the `generateInteractiveExercise` function.
 * - `InteractiveExerciseOutput`: The output type for the `generateInteractiveExercise` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveExerciseInputSchema = z.object({
  recommendation: z
    .string()
    .describe('The daily mental health recommendation to base the exercise on.'),
});
export type InteractiveExerciseInput = z.infer<typeof InteractiveExerciseInputSchema>;

const InteractiveExerciseOutputSchema = z.object({
  exerciseName: z.string().describe('The name of the interactive exercise.'),
  exerciseDescription: z
    .string()
    .describe('A brief description of how to perform the interactive exercise.'),
  exerciseObjective: z.string().describe('The objective of the exercise.'),
});
export type InteractiveExerciseOutput = z.infer<typeof InteractiveExerciseOutputSchema>;

export async function generateInteractiveExercise(
  input: InteractiveExerciseInput
): Promise<InteractiveExerciseOutput> {
  return interactiveExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveExercisePrompt',
  input: {schema: InteractiveExerciseInputSchema},
  output: {schema: InteractiveExerciseOutputSchema},
  prompt: `You are an expert in creating engaging and therapeutic mini-games and exercises.

  Based on the following daily recommendation, create an interactive mini-game or exercise that will help the user apply the recommendation in a fun and engaging way.

  Recommendation: {{{recommendation}}}

  The exercise should be brief, accessible, and suitable for all audiences. It should reinforce positive habits and reduce stress.
  The game/exercise should be described in a way that could be easily shown in an app that helps reduce daily stress.

  Make sure that the output fields are set appropriately and follow the descriptions closely.
  `,
});

const interactiveExerciseFlow = ai.defineFlow(
  {
    name: 'interactiveExerciseFlow',
    inputSchema: InteractiveExerciseInputSchema,
    outputSchema: InteractiveExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
