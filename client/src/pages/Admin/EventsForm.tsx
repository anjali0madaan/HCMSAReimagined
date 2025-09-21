import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { insertEventSchema, type Event } from "@shared/schema";
import { z } from "zod";

// Form schema - convert Date to string for form inputs
const eventsFormSchema = insertEventSchema.extend({
  event_date: z.string().min(1, "Event date is required"),
}).omit({
  end_date: true, // Skip complex fields for now
  featured_image: true,
  registration_required: true,
  external_registration_url: true,
});

type EventsFormData = z.infer<typeof eventsFormSchema>;

export default function EventsForm() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Fetch existing event for editing
  const { data: existingEvent } = useQuery<Event>({
    queryKey: ['/api/cms/events', id],
    enabled: isEdit,
  });

  const form = useForm<EventsFormData>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      event_date: "",
      published: false,
    },
  });

  // Update form when existing event is loaded
  useEffect(() => {
    if (existingEvent) {
      // Convert Date to string for form input
      const eventDateStr = existingEvent.event_date 
        ? new Date(existingEvent.event_date).toISOString().slice(0, 16)
        : "";
        
      form.reset({
        title: existingEvent.title,
        description: existingEvent.description,
        location: existingEvent.location || "",
        event_date: eventDateStr,
        published: existingEvent.published,
      });
    }
  }, [existingEvent, form]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: EventsFormData) => {
      // Convert string back to Date for API
      const apiData = {
        ...data,
        event_date: data.event_date ? new Date(data.event_date) : new Date(),
      };
      return apiRequest('POST', '/api/cms/events', apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/events'] });
      toast({ title: "Success", description: "Event created successfully" });
      navigate("/admin/events");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create event", 
        variant: "destructive" 
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: EventsFormData) => {
      // Convert string back to Date for API
      const apiData = {
        ...data,
        event_date: data.event_date ? new Date(data.event_date) : new Date(),
      };
      return apiRequest('PUT', `/api/cms/events/${id}`, apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/events'] });
      toast({ title: "Success", description: "Event updated successfully" });
      navigate("/admin/events");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update event", 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: EventsFormData) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="outline" size="sm" data-testid="button-back-to-events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Event' : 'Create Event'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the event details' : 'Create a new event'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Event' : 'New Event'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter event title"
                        {...field}
                        data-testid="input-event-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter event description..."
                        {...field}
                        rows={5}
                        data-testid="textarea-event-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="event_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          data-testid="input-event-date"
                        />
                      </FormControl>
                      <FormDescription>
                        Date and time of the event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Event location"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-event-location"
                        />
                      </FormControl>
                      <FormDescription>
                        Where the event will be held
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-event-published"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>
                        Make this event visible to the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/admin/events">
                  <Button variant="outline" type="button" disabled={isPending}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  data-testid="button-save-event"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}