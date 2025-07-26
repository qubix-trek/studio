import type { DailyRecommendationOutput } from '@/ai/flows/daily-recommendation';
import { BrainCircuit, BookOpen, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Feedback } from './feedback';

interface RecommendationDisplayProps {
  data: DailyRecommendationOutput;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-shrink-0 bg-primary/20 text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center">
    {children}
  </div>
);

export function RecommendationDisplay({ data }: { data: DailyRecommendationOutput }) {
  const { emotionalProfile, recommendation, finalActivity } = data;

  return (
    <div className="space-y-6">
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <IconWrapper>
            <BrainCircuit className="h-6 w-6" />
          </IconWrapper>
          <CardTitle className="font-headline text-2xl">Tu perfil emocional de hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{emotionalProfile}</p>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-accent/20">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <IconWrapper>
            <BookOpen className="h-6 w-6" />
          </IconWrapper>
          <CardTitle className="font-headline text-2xl">Recomendación personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{recommendation}</p>
        </CardContent>
      </Card>

      <Card className="bg-secondary/20 border-secondary/40">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <IconWrapper>
            <Gamepad2 className="h-6 w-6" />
          </IconWrapper>
          <CardTitle className="font-headline text-2xl">Actividad final</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{finalActivity}</p>
        </CardContent>
      </Card>

      <Feedback />
    </div>
  );
}
