'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';

const surveySchema = z.object({
  feeling: z.string({ required_error: 'Por favor, selecciona cómo te sientes.' }),
  preference: z.string({ required_error: 'Por favor, selecciona una preferencia.' }),
  time: z.string({ required_error: 'Por favor, selecciona cuánto tiempo tienes.' }),
  need: z.string({ required_error: 'Por favor, selecciona qué necesitas hoy.' }),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

export default function SurveyPage() {
  const router = useRouter();
  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
  });

  const onSubmit = (data: SurveyFormValues) => {
    const params = new URLSearchParams(data);
    router.push(`/recommendation?${params.toString()}`);
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
          <Card className="border-2 border-primary/20 shadow-lg bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-center">Cuéntanos un poco sobre ti</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="feeling"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-lg font-semibold">1. ¿Cómo te sientes hoy?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                          >
                            {['Feliz', 'Ansioso/a', 'Triste', 'Irritado/a', 'Tranquilo/a'].map((item) => (
                              <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item} />
                                </FormControl>
                                <FormLabel className="font-normal text-base">{item}</FormLabel>
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
                    name="preference"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-lg font-semibold">2. ¿Qué prefieres hacer para sentirte mejor?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                             className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                          >
                            {['Meditar', 'Respirar', 'Escribir', 'Moverte', 'Escuchar música'].map((item) => (
                              <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item} />
                                </FormControl>
                                <FormLabel className="font-normal text-base">{item}</FormLabel>
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
                    name="time"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-lg font-semibold">3. ¿Cuánto tiempo puedes dedicarte hoy?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                          >
                            {['2 minutos', '5 minutos', '10+ minutos'].map((item) => (
                              <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item} />
                                </FormControl>
                                <FormLabel className="font-normal text-base">{item}</FormLabel>
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
                    name="need"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-lg font-semibold">4. ¿Qué necesitas hoy?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                          >
                            {['Motivación', 'Calma', 'Energía', 'Conexión'].map((item) => (
                              <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item} />
                                </FormControl>
                                <FormLabel className="font-normal text-base">{item}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" size="lg" className="w-full">
                    Continuar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

       <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Mindful Daily Dose. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
