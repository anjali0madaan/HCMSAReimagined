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
import { insertNewsSchema, type News } from "@shared/schema";
import { z } from "zod";

const newsFormSchema = insertNewsSchema.extend({
  slug: z.string().min(1, "Slug is required"),
});

type NewsFormData = z.infer<typeof newsFormSchema>;

export default function NewsForm() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Fetch existing news for editing
  const { data: existingNews } = useQuery<News>({
    queryKey: ['/api/cms/news', id],
    enabled: isEdit,
  });

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      slug: "", 
      content: "",
      excerpt: "",
      featured_image: "",
      published: false,
    },
  });

  // Update form when existing news is loaded
  useEffect(() => {
    if (existingNews) {
      form.reset({
        title: existingNews.title,
        slug: existingNews.slug || "",
        content: existingNews.content,
        excerpt: existingNews.excerpt || "",
        featured_image: existingNews.featured_image || "",
        published: existingNews.published,
      });
    }
  }, [existingNews, form]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: NewsFormData) => 
      apiRequest('POST', '/api/cms/news', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/news'] });
      toast({ title: "Success", description: "News article created successfully" });
      navigate("/admin/news");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create news article", 
        variant: "destructive" 
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: NewsFormData) =>
      apiRequest('PUT', `/api/cms/news/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/news'] });
      toast({ title: "Success", description: "News article updated successfully" });
      navigate("/admin/news");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update news article", 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: NewsFormData) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    if (!isEdit || !existingNews?.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setValue("slug", slug);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/news">
          <Button variant="outline" size="sm" data-testid="button-back-to-news">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit News Article' : 'Create News Article'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the news article details' : 'Create a new news article'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Article' : 'New Article'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter article title"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTitleChange(e.target.value);
                          }}
                          data-testid="input-news-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="url-friendly-slug"
                          {...field}
                          data-testid="input-news-slug"
                        />
                      </FormControl>
                      <FormDescription>
                        URL-friendly version of the title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the article"
                        {...field}
                        value={field.value || ""}
                        rows={3}
                        data-testid="textarea-news-excerpt"
                      />
                    </FormControl>
                    <FormDescription>
                      Brief description shown in lists and previews
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your article content here..."
                        {...field}
                        rows={10}
                        data-testid="textarea-news-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        value={field.value || ""}
                        data-testid="input-news-image"
                      />
                    </FormControl>
                    <FormDescription>
                      URL of the featured image for this article
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-news-published"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>
                        Make this article visible to the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/admin/news">
                  <Button variant="outline" type="button" disabled={isPending}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  data-testid="button-save-news"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}