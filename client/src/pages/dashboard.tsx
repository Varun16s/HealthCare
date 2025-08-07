import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { User, MessageCircle, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import ProfileForm from "@/components/profile-form";
import AIChat from "@/components/ai-chat";
import AppointmentCalendar from "@/components/appointment-calendar";
import BookingForm from "@/components/booking-form";

type DashboardSection = "profile" | "chat" | "calendar" | "booking";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<DashboardSection>("profile");

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user) {
    return null;
  }

  const navItems = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "chat" as const, label: "AI Assistant", icon: MessageCircle },
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
    { id: "booking" as const, label: "Book Appointment", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            Welcome back, <span data-testid="text-username">{user.firstName}</span>!
          </h1>
          <p className="opacity-90">How are you feeling today? Let's find the support you need.</p>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                onClick={() => setActiveSection(item.id)}
                className={`px-6 py-3 ${
                  activeSection === item.id
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "bg-white border-sage-200 hover:bg-sage-50"
                }`}
                data-testid={`button-${item.id}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
          {activeSection === "profile" && <ProfileForm />}
          {activeSection === "chat" && <AIChat />}
          {activeSection === "calendar" && <AppointmentCalendar />}
          {activeSection === "booking" && <BookingForm />}
        </div>
      </div>
    </div>
  );
}
