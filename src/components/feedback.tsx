"use client";

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Feedback() {
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = () => {
    setFeedbackGiven(true);
  };

  return (
    <Card className="bg-background/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-headline text-center">How was this recommendation?</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {feedbackGiven ? (
          <div className="flex items-center gap-2 text-primary animate-in fade-in">
            <CheckCircle className="h-5 w-5" />
            <p className="font-semibold">Thank you for your feedback!</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button variant="outline" size="lg" onClick={handleFeedback} aria-label="Helpful">
              <ThumbsUp className="h-5 w-5 mr-2" />
              Helpful
            </Button>
            <Button variant="outline" size="lg" onClick={handleFeedback} aria-label="Not Helpful">
              <ThumbsDown className="h-5 w-5 mr-2" />
              Not Helpful
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
