import { Employee } from '@/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface EmployeeCardProps {
    employee: Employee;
    isSelected: boolean;
    onClick: () => void;
}

export function EmployeeCard({ employee, isSelected, onClick }: EmployeeCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'border-primary ring-2 ring-primary' : ''
                }`}
            onClick={onClick}
        >
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.image} alt={employee.name} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {employee.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                            {specialty}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}