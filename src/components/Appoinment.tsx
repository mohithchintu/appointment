import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ServiceCard } from './ServiceCard';
import { EmployeeCard } from './EmployeeCard';
import { services } from '@/data/services';
import { employees } from '@/data/employees';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, User, Calendar as CalendarIcon } from 'lucide-react';

const formSchema = z.object({
    service: z.string().min(1, 'Please select a service'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    date: z.date({ required_error: 'Please select a date' }),
    time: z.string().min(1, 'Please select a time'),
    employee: z.string().min(1, 'Please select an employee'),
    notes: z.string().optional(),
});

const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export function AppointmentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            service: '',
            name: '',
            email: '',
            phone: '',
            time: '',
            notes: '',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        alert('Appointment booked');
    };

    return (
        <Form {...form}>
            <form className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="h-6 w-6" />
                        Select a Service
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isSelected={form.watch('service') === service.id}
                                onClick={() => form.setValue('service', service.id)}
                            />
                        ))}
                    </div>
                    <Button
                        className="w-full"
                        disabled={!form.watch('service')}
                    >
                        Continue
                    </Button>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <User className="h-6 w-6" />
                        Your Details
                    </h2>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(123) 456-7890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6" />
                        Choose Date & Stylist
                    </h2>
                    <Card>
                        <CardContent className="pt-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date</FormLabel>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date() || date.getDay() === 0}
                                            className="rounded-md border"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((time) => (
                                        <Button
                                            key={time}
                                            type="button"
                                            variant={field.value === time ? 'default' : 'outline'}
                                            className="w-full"
                                            onClick={() => form.setValue('time', time)}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        <FormLabel>Select Stylist</FormLabel>
                        <div className="grid gap-4 md:grid-cols-2">
                            {employees.map((employee) => (
                                <EmployeeCard
                                    key={employee.id}
                                    employee={employee}
                                    isSelected={form.watch('employee') === employee.id}
                                    onClick={() => form.setValue('employee', employee.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Any special requests or notes for your appointment..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={!form.watch('date') || !form.watch('time') || !form.watch('employee')}
                >
                    Book Appointment
                </Button>
            </form>
        </Form>
    );
}
