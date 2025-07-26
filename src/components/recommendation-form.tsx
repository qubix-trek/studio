'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  userInput: z.string().min(10, { message: 'Por favor, escribe un poco más sobre cómo te sientes.' }),
});

type RecommendationFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: '',
    },
  });

  return (
    <Card className="border-2 border-primary/20 shadow-lg bg-background/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-headline">🔹 Escribe cómo te sientes hoy y qué necesitas en este momento.</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: “Me siento abrumado, necesito descansar” o “Estoy triste y quiero motivación”"
                      className="min-h-[120px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
