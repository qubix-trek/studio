'use client';

import { useState } from 'react';
import type { DailyRecommendationOutput, DailyRecommendationInput } from '@/ai/flows/daily-recommendation';
import { getDailyRecommendation } from '@/ai/flows/daily-recommendation';
import { RecommendationForm } from '@/components/recommendation-form';
import { RecommendationDisplay } from '@/components/recommendation-display';
import { RecommendationSkeleton } from '@/components/recommendation-skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<DailyRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async (data: DailyRecommendationInput) => {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await getDailyRecommendation(data);
      setRecommendation(result);
    } catch (e) {
      setError("Sorry, we couldn't generate a recommendation. The model might be busy. Please try again in a moment.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline text-foreground tracking-wide">Mindful Daily Dose</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-8">
          {isLoading ? (
            <RecommendationSkeleton />
          ) : error ? (
            <div className="animate-in fade-in duration-500">
              <Alert variant="destructive" className="border-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Button variant="outline" onClick={handleReset}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : recommendation ? (
            <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <RecommendationDisplay data={recommendation} />
              <div className="text-center mt-8">
                <Button onClick={handleReset}>Get a New Dose</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in duration-500">
              <h2 className="text-4xl font-headline text-foreground">Your daily pause for mental wellness.</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                Tell us how you're feeling, and we'll provide a personalized dose of mindfulness to help you navigate your day with more calm and clarity.
              </p>
              <RecommendationForm onSubmit={handleGetRecommendation} isLoading={isLoading} />
            </div>
          )}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Mindful Daily Dose. All rights reserved.</p>
      </footer>
    </div>
  );
}
