import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  supportType: z.string().min(1, "Please select a support type"),
  specialist: z.string().min(1, "Please select a specialist"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  sessionType: z.string().min(1, "Please select a session type"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Recommendation {
  name: string;
  specialty: string;
  availability: string[];
  approach: string;
  rating: string;
}

export default function BookingForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      supportType: "",
      specialist: "",
      date: "",
      time: "",
      sessionType: "video",
      notes: "",
    },
  });

  const bookAppointmentMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("POST", "/api/appointments", {
        ...data,
        userId: user?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments", user?.id] });
      toast({
        title: "Appointment booked successfully!",
        description: "You can view it in your calendar.",
      });
      form.reset();
      setShowRecommendation(false);
      setRecommendation(null);
    },
  });

  const getRecommendationMutation = useMutation({
    mutationFn: async (supportType: string) => {
      const response = await apiRequest("POST", "/api/ai/recommend", {
        supportType,
        userId: user?.id,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setRecommendation(data);
      setShowRecommendation(true);
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookAppointmentMutation.mutate(data);
  };

  const handleGetRecommendation = () => {
    const supportType = form.getValues("supportType");
    if (!supportType) {
      toast({
        title: "Please select a support type first",
        variant: "destructive",
      });
      return;
    }
    getRecommendationMutation.mutate(supportType);
  };

  const acceptRecommendation = () => {
    if (recommendation) {
      form.setValue("specialist", recommendation.name);
      setShowRecommendation(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-8" data-testid="booking-form">
      <h2 className="text-2xl font-semibold text-sage-700 mb-6">Book New Appointment</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="supportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-support-type">
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="anxiety">Anxiety Support</SelectItem>
                      <SelectItem value="depression">Depression Counseling</SelectItem>
                      <SelectItem value="adhd">ADHD Management</SelectItem>
                      <SelectItem value="autism">Autism Support</SelectItem>
                      <SelectItem value="social">Social Skills</SelectItem>
                      <SelectItem value="general">General Counseling</SelectItem>
                      <SelectItem value="crisis">Crisis Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Specialist</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-specialist">
                        <SelectValue placeholder="Let AI suggest best match" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson (Anxiety & ADHD)</SelectItem>
                      <SelectItem value="Alex Chen, LCSW">Alex Chen, LCSW (Teen Counselor)</SelectItem>
                      <SelectItem value="Dr. Raj Patel">Dr. Raj Patel (Autism Specialist)</SelectItem>
                      <SelectItem value="Maria Garcia, MFT">Maria Garcia, MFT (Family Therapy)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      min={today}
                      data-testid="input-date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-time">
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="sessionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" data-testid="radio-video" />
                      <Label htmlFor="video">Video call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" data-testid="radio-phone" />
                      <Label htmlFor="phone">Phone call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chat" id="chat" data-testid="radio-chat" />
                      <Label htmlFor="chat">Text chat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" data-testid="radio-in-person" />
                      <Label htmlFor="in-person">In-person</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us anything else that might help us provide better support..."
                    data-testid="textarea-notes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={bookAppointmentMutation.isPending}
              data-testid="button-book-appointment"
            >
              {bookAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetRecommendation}
              disabled={getRecommendationMutation.isPending}
              className="bg-secondary-500 hover:bg-secondary-600 text-white border-secondary-500"
              data-testid="button-get-recommendation"
            >
              {getRecommendationMutation.isPending ? "Getting..." : "Get AI Recommendation"}
            </Button>
          </div>
        </form>
      </Form>

      {/* AI Recommendation */}
      {showRecommendation && recommendation && (
        <Card className="mt-8 border-secondary-200 bg-gradient-to-r from-secondary-50 to-primary-50" data-testid="ai-recommendation">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-sage-700 mb-4 flex items-center">
              <Lightbulb className="text-secondary-500 mr-2 h-5 w-5" />
              AI Recommendation
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sage-700">{recommendation.name}</h4>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {recommendation.rating} rating
                </span>
              </div>
              <p className="text-sage-600">
                {recommendation.specialty} • {recommendation.approach}
              </p>
              <div className="bg-white p-4 rounded-lg border border-sage-200">
                <h5 className="font-medium text-sage-700 mb-2">Recommended Times:</h5>
                <div className="flex space-x-2">
                  {recommendation.availability.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => form.setValue("time", time.includes("AM") ? 
                        time.replace(" AM", "").padStart(5, "0") :
                        (parseInt(time) + 12).toString().padStart(2, "0") + ":00"
                      )}
                      className="bg-primary-100 text-primary-700 border-primary-200 hover:bg-primary-200"
                      data-testid={`button-time-${time.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                onClick={acceptRecommendation}
                className="bg-secondary-500 hover:bg-secondary-600 text-white"
                data-testid="button-accept-recommendation"
              >
                Book with {recommendation.name}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
