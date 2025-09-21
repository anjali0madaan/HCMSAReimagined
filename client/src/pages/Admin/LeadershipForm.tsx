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
import { insertLeadershipSchema, type Leadership } from "@shared/schema";
import { z } from "zod";

type LeadershipFormData = z.infer<typeof insertLeadershipSchema>;

export default function LeadershipForm() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Fetch existing leadership for editing
  const { data: existingLeader } = useQuery<Leadership>({
    queryKey: ['/api/cms/leadership', id],
    enabled: isEdit,
  });

  const form = useForm<LeadershipFormData>({
    resolver: zodResolver(insertLeadershipSchema),
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      photo: "",
      email: "",
      phone: "",
      order: 0,
      active: true,
    },
  });

  // Update form when existing leader is loaded
  useEffect(() => {
    if (existingLeader) {
      form.reset({
        name: existingLeader.name,
        position: existingLeader.position,
        bio: existingLeader.bio || "",
        photo: existingLeader.photo || "",
        email: existingLeader.email || "",
        phone: existingLeader.phone || "",
        order: existingLeader.order,
        active: existingLeader.active,
      });
    }
  }, [existingLeader, form]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: LeadershipFormData) => 
      apiRequest('POST', '/api/cms/leadership', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/leadership'] });
      toast({ title: "Success", description: "Leader created successfully" });
      navigate("/admin/leadership");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create leader", 
        variant: "destructive" 
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: LeadershipFormData) =>
      apiRequest('PUT', `/api/cms/leadership/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/leadership'] });
      toast({ title: "Success", description: "Leader updated successfully" });
      navigate("/admin/leadership");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update leader", 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: LeadershipFormData) => {
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
        <Link href="/admin/leadership">
          <Button variant="outline" size="sm" data-testid="button-back-to-leadership">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leadership
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Leader' : 'Add Leader'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the leader details' : 'Add a new leader to the team'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Leader' : 'New Leader'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter full name"
                          {...field}
                          data-testid="input-leader-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Job title or position"
                          {...field}
                          data-testid="input-leader-position"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter biography..."
                        {...field}
                        value={field.value || ""}
                        rows={4}
                        data-testid="textarea-leader-bio"
                      />
                    </FormControl>
                    <FormDescription>
                      Brief biography of the leader
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/photo.jpg"
                        {...field}
                        value={field.value || ""}
                        data-testid="input-leader-photo"
                      />
                    </FormControl>
                    <FormDescription>
                      URL of the leader's photo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-leader-email"
                        />
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
                        <Input
                          placeholder="Phone number"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-leader-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-leader-order"
                      />
                    </FormControl>
                    <FormDescription>
                      Order in which this leader appears (lower numbers first)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-leader-active"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>
                        Show this leader in the public listing
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/admin/leadership">
                  <Button variant="outline" type="button" disabled={isPending}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  data-testid="button-save-leader"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? 'Saving...' : isEdit ? 'Update Leader' : 'Add Leader'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}