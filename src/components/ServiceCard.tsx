import { Service } from '@/interfaces';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onClick: () => void;
}

export function ServiceCard({ service, isSelected, onClick }: ServiceCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'border-primary ring-2 ring-primary' : ''
                }`}
            onClick={onClick}
        >
            <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${service.price}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}