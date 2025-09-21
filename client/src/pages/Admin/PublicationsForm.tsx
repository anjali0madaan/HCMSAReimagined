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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { insertPublicationSchema, type Publication } from "@shared/schema";
import { z } from "zod";

// Form schema - convert Date to string for form inputs
const publicationsFormSchema = insertPublicationSchema.extend({
  publication_date: z.string().optional(),
});

type PublicationsFormData = z.infer<typeof publicationsFormSchema>;

export default function PublicationsForm() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Fetch existing publication for editing
  const { data: existingPublication } = useQuery<Publication>({
    queryKey: ['/api/cms/publications', id],
    enabled: isEdit,
  });

  const form = useForm<PublicationsFormData>({
    resolver: zodResolver(publicationsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      document_file: "",
      category: "guidelines",
      publication_date: "",
      author: "",
      published: false,
    },
  });

  // Update form when existing publication is loaded
  useEffect(() => {
    if (existingPublication) {
      // Convert Date to string for form input
      const pubDateStr = existingPublication.publication_date 
        ? new Date(existingPublication.publication_date).toISOString().slice(0, 10)
        : "";
        
      form.reset({
        title: existingPublication.title,
        description: existingPublication.description || "",
        document_file: existingPublication.document_file || "",
        category: existingPublication.category,
        publication_date: pubDateStr,
        author: existingPublication.author || "",
        published: existingPublication.published,
      });
    }
  }, [existingPublication, form]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: PublicationsFormData) => {
      // Convert string back to Date for API
      const apiData = {
        ...data,
        publication_date: data.publication_date ? new Date(data.publication_date) : null,
      };
      return apiRequest('POST', '/api/cms/publications', apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/publications'] });
      toast({ title: "Success", description: "Publication created successfully" });
      navigate("/admin/publications");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create publication", 
        variant: "destructive" 
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: PublicationsFormData) => {
      // Convert string back to Date for API
      const apiData = {
        ...data,
        publication_date: data.publication_date ? new Date(data.publication_date) : null,
      };
      return apiRequest('PUT', `/api/cms/publications/${id}`, apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/publications'] });
      toast({ title: "Success", description: "Publication updated successfully" });
      navigate("/admin/publications");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update publication", 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: PublicationsFormData) => {
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
        <Link href="/admin/publications">
          <Button variant="outline" size="sm" data-testid="button-back-to-publications">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Publications
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Publication' : 'Create Publication'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the publication details' : 'Create a new publication'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Publication' : 'New Publication'}</CardTitle>
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
                        placeholder="Enter publication title"
                        {...field}
                        data-testid="input-publication-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-publication-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="guidelines">Guidelines</SelectItem>
                          <SelectItem value="reports">Reports</SelectItem>
                          <SelectItem value="newsletters">Newsletters</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Author name"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-publication-author"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter publication description..."
                        {...field}
                        value={field.value || ""}
                        rows={4}
                        data-testid="textarea-publication-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="document_file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document File URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/document.pdf"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-publication-document"
                        />
                      </FormControl>
                      <FormDescription>
                        URL of the publication document
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publication_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-publication-date"
                        />
                      </FormControl>
                      <FormDescription>
                        When the publication was released
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
                        data-testid="checkbox-publication-published"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>
                        Make this publication visible to the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/admin/publications">
                  <Button variant="outline" type="button" disabled={isPending}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  data-testid="button-save-publication"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? 'Saving...' : isEdit ? 'Update Publication' : 'Create Publication'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}