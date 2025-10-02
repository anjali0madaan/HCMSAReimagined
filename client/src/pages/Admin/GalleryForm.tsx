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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { insertGallerySchema, type Gallery } from "@shared/schema";
import { z } from "zod";

type GalleryFormData = z.infer<typeof insertGallerySchema>;

export default function GalleryForm() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const { data: existingGallery } = useQuery<Gallery>({
    queryKey: ['/api/cms/gallery', id],
    enabled: isEdit,
  });

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(insertGallerySchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "other",
      order: 0,
      published: false,
    },
  });

  useEffect(() => {
    if (existingGallery) {
      form.reset({
        title: existingGallery.title,
        description: existingGallery.description || "",
        image: existingGallery.image,
        category: existingGallery.category,
        order: existingGallery.order,
        published: existingGallery.published,
      });
    }
  }, [existingGallery, form]);

  const createMutation = useMutation({
    mutationFn: (data: GalleryFormData) => 
      apiRequest('POST', '/api/cms/gallery', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/gallery'] });
      toast({ title: "Success", description: "Gallery item created successfully" });
      navigate("/admin/gallery");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create gallery item", 
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: GalleryFormData) =>
      apiRequest('PUT', `/api/cms/gallery/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/gallery'] });
      toast({ title: "Success", description: "Gallery item updated successfully" });
      navigate("/admin/gallery");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update gallery item", 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: GalleryFormData) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="outline" size="sm" data-testid="button-back-to-gallery">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update gallery item details' : 'Add a new image to the gallery'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Gallery Item' : 'Create Gallery Item'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Conference 2024" 
                        {...field} 
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormDescription>
                      The title of the gallery item
                    </FormDescription>
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
                        placeholder="Description of the image or event..."
                        className="min-h-[100px]"
                        {...field}
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description or caption for the image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg or /path/to/image.jpg"
                        {...field}
                        data-testid="input-image"
                      />
                    </FormControl>
                    <FormDescription>
                      URL or path to the gallery image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('image') && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <img 
                    src={form.watch('image')} 
                    alt="Preview" 
                    className="max-w-md rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="activities">Activities</SelectItem>
                        <SelectItem value="awards">Awards</SelectItem>
                        <SelectItem value="conferences">Conferences</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Category for organizing gallery items
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        data-testid="input-order"
                      />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first (0 = highest priority)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-published"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Published
                      </FormLabel>
                      <FormDescription>
                        Make this gallery item visible on the public website
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  data-testid="button-submit"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? 'Saving...' : isEdit ? 'Update Gallery Item' : 'Create Gallery Item'}
                </Button>
                <Link href="/admin/gallery">
                  <Button variant="outline" type="button" data-testid="button-cancel">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
