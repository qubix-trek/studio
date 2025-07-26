'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

function RecommendationComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const surveyData = {
    feeling: searchParams.get('feeling') || '',
    preference: searchParams.get('preference') || '',
    time: searchParams.get('time') || '',
    need: searchParams.get('need') || '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<DailyRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async (data: { userInput: string }) => {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const input: DailyRecommendationInput = {
        ...surveyData,
        userInput: data.userInput,
      };
      const result = await getDailyRecommendation(input);
      setRecommendation(result);
    } catch (e) {
      setError("Lo siento, no pudimos generar una recomendación. El modelo podría estar ocupado. Por favor, inténtalo de nuevo en un momento.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    router.push('/');
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
                <AlertTitle>Algo salió mal</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Button variant="outline" onClick={handleReset}>
                  Empezar de nuevo
                </Button>
              </div>
            </div>
          ) : recommendation ? (
            <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <RecommendationDisplay data={recommendation} />
              <div className="text-center mt-8">
                <Button onClick={handleReset}>Obtener una nueva dosis</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in duration-500">
               <h2 className="text-4xl font-headline text-foreground">✍️ “Cuéntanos cómo te sientes hoy y qué necesitas en este momento.”</h2>
              <RecommendationForm onSubmit={handleGetRecommendation} isLoading={isLoading} />
            </div>
          )}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Mindful Daily Dose. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default function RecommendationPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RecommendationComponent />
    </Suspense>
  );
}
