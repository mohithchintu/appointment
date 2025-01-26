import { AppointmentForm } from '@/components/Appoinment'
import { Calendar } from 'lucide-react'
import React from 'react'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-2">
                   <Calendar className="h-8 w-8 text-primary" /> 
                        <h1 className="text-3xl font-bold">Schedule Your JFSO Appointment</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-3xl">
                    <AppointmentForm />
                </div>
            </main>
        </div>
    )
}

export default Home
