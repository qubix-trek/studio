'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Smile, Meh, Frown, HeartCrack, CloudLightning } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  mood: z.string({
    required_error: 'Please select your current mood.',
  }),
  stressors: z.string().min(10, 'Please describe your stressors in at least 10 characters.').max(500, 'Please keep your description under 500 characters.'),
});

type RecommendationFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

const moodOptions = [
  { value: 'Content', label: 'Content', icon: Smile },
  { value: 'Neutral', label: 'Neutral', icon: Meh },
  { value: 'Sad', label: 'Sad', icon: Frown },
  { value: 'Anxious', label: 'Anxious', icon: HeartCrack },
  { value: 'Stressed', label: 'Stressed', icon: CloudLightning },
];

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stressors: '',
    },
  });

  return (
    <Card className="border-2 border-primary/20 shadow-lg bg-background/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-headline">First, how are you feeling today?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {moodOptions.map(option => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} className="sr-only" />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              'flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors w-full',
                              field.value === option.value && 'border-primary bg-primary/10'
                            )}
                          >
                            <option.icon className="h-8 w-8 mb-2" />
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stressors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-headline">What's on your mind?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., upcoming project deadline, family matters, feeling overwhelmed..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating your dose...' : 'Get My Recommendation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
