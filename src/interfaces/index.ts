export interface Service {
    id: string;
    name: string;
    duration: number;
    price: number;
    description: string;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    image: string;
    specialties: string[];
}

export interface AppointmentFormData {
    service: Service | null;
    name: string;
    email: string;
    phone: string;
    date: Date | null;
    time: string;
    employee: Employee | null;
    notes: string;
}