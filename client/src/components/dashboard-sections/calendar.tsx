import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Clock, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@shared/schema";

export default function CalendarSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["/api/appointments", user?.id],
    enabled: !!user,
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments", user?.id] });
      toast({
        title: "Appointment cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getSupportTypeColor = (supportType: string) => {
    switch (supportType) {
      case "anxiety":
        return "border-l-primary-500 bg-primary-50";
      case "adhd":
        return "border-l-secondary-500 bg-secondary-50";
      case "depression":
        return "border-l-accent-500 bg-accent-50";
      default:
        return "border-l-sage-500 bg-sage-50";
    }
  };

  if (isLoading) {
    return (
      <div className="p-8" data-testid="calendar-loading">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sage-200 rounded w-1/3"></div>
          <div className="h-4 bg-sage-200 rounded w-1/4"></div>
          <div className="h-32 bg-sage-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8" data-testid="calendar-section">
      <h2 className="text-2xl font-semibold text-sage-700 mb-6">Your Appointments</h2>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-sage-700 mb-4">Upcoming Appointments</h3>
        
        {appointments.length === 0 ? (
          <Card className="border-dashed border-2 border-sage-200">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-sage-300 mx-auto mb-4" />
              <p className="text-sage-600 mb-4" data-testid="text-no-appointments">
                No appointments scheduled yet
              </p>
              <p className="text-sm text-sage-500">
                Book your first appointment using the AI assistant or booking form
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment: Appointment) => (
              <Card 
                key={appointment.id} 
                className={`border-l-4 ${getSupportTypeColor(appointment.supportType)}`} 
                data-testid={`appointment-card-${appointment.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sage-700" data-testid={`appointment-specialist-${appointment.id}`}>
                        {appointment.specialist || "Specialist"}
                      </h4>
                      <p className="text-sm text-sage-600 capitalize" data-testid={`appointment-type-${appointment.id}`}>
                        {appointment.supportType.replace(/([A-Z])/g, ' $1').trim()} Support
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-sage-600 flex items-center" data-testid={`appointment-date-${appointment.id}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(appointment.date)}
                        </span>
                        <span className="text-sm text-sage-600 flex items-center" data-testid={`appointment-time-${appointment.id}`}>
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(appointment.time)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs bg-sage-100 text-sage-600 px-2 py-1 rounded-full capitalize">
                          {appointment.sessionType}
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-sage-500 mt-2" data-testid={`appointment-notes-${appointment.id}`}>
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sage-600 hover:text-sage-700"
                        data-testid={`button-edit-appointment-${appointment.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAppointmentMutation.mutate(appointment.id)}
                        disabled={deleteAppointmentMutation.isPending}
                        className="text-red-500 hover:text-red-600"
                        data-testid={`button-cancel-appointment-${appointment.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Simple Calendar Placeholder */}
      <div>
        <h3 className="text-lg font-medium text-sage-700 mb-4">Calendar View</h3>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-sage-600">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-sage-300" />
              <p className="mb-2" data-testid="text-calendar-placeholder">Interactive calendar coming soon!</p>
              <p className="text-sm text-sage-500">
                For now, view your appointments in the list above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
