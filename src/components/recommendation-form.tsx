'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Smile, Meh, Frown, HeartCrack, Wind, Activity, Book, Brain, Watch, Timer, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  mood: z.string({ required_error: 'Por favor, selecciona tu estado de ánimo actual.' }),
  activityPreference: z.string({ required_error: 'Por favor, selecciona tu preferencia de actividad.' }),
  copingPreference: z.string({ required_error: 'Por favor, selecciona cómo prefieres procesar tus emociones.' }),
  timeAvailable: z.string({ required_error: 'Por favor, selecciona cuánto tiempo tienes.' }),
});

type RecommendationFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

const moodOptions = [
  { value: 'Tranquilo', label: 'Tranquilo', icon: Smile },
  { value: 'Ansioso', label: 'Ansioso', icon: HeartCrack },
  { value: 'Triste', label: 'Triste', icon: Frown },
  { value: 'Irritado', label: 'Irritado', icon: Wind },
  { value: 'Neutral', label: 'Neutral', icon: Meh },
];

const activityOptions = [
  { value: 'Activa', label: 'Activa', icon: Activity },
  { value: 'Tranquila', label: 'Tranquila', icon: Meh },
];

const copingOptions = [
    { value: 'Escribir', label: 'Escribir', icon: Book },
    { value: 'Moverme', label: 'Moverme', icon: Activity },
    { value: 'Respirar', label: 'Respirar', icon: Wind },
    { value: 'Reflexionar', label: 'Reflexionar', icon: Brain },
];

const timeOptions = [
    { value: '2', label: '2 min', icon: Watch },
    { value: '5', label: '5 min', icon: Timer },
    { value: '10', label: '10 min', icon: Clock },
];


export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
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
                  <FormLabel className="text-lg font-headline">Primero, ¿cómo te sientes hoy?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {moodOptions.map(option => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} className="sr-only" />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              'flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors w-full aspect-square',
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
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="activityPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">¿Actividades?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Activas o tranquilas..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {activityOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                                <option.icon className="h-5 w-5" />
                                {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copingPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">¿Qué te ayuda más?</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escribir, moverte..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {copingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                                <option.icon className="h-5 w-5" />
                                {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">¿Cuánto tiempo tienes?</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="2, 5, 10 minutos..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                                <option.icon className="h-5 w-5" />
                                {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generando tu dosis...' : 'Obtener mi recomendación'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
