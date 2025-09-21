import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, RefreshCw, BookOpen, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { Publication } from "@shared/schema";

export default function PublicationsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const { data: publications, isLoading, refetch, error } = useQuery<Publication[]>({
    queryKey: ['/api/cms/publications'],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/cms/publications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/publications'] });
      toast({ title: "Success", description: "Publication deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete publication", variant: "destructive" });
    },
  });

  const togglePublishedMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      apiRequest('PUT', `/api/cms/publications/${id}`, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/publications'] });
      toast({ title: "Success", description: "Publication updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update publication", variant: "destructive" });
    },
  });

  const filteredPublications = publications?.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleTogglePublished = (id: string, currentStatus: boolean) => {
    togglePublishedMutation.mutate({ id, published: !currentStatus });
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              Error loading publications: {(error as Error).message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryStats = publications?.reduce((acc, pub) => {
    acc[pub.category] = (acc[pub.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publications Management</h1>
          <p className="text-muted-foreground">Manage documents and publications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isLoading} data-testid="button-refresh-publications">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/admin/publications/new">
            <Button data-testid="button-add-publication">
              <Plus className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPublications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredPublications.filter(pub => pub.published).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.guidelines || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.reports || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title, description, author, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-publications"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>{filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} found</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading publications...</div>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">
                {searchQuery ? 'No publications match your search' : 'No publications found'}
              </div>
              {!searchQuery && (
                <Link href="/admin/publications/new">
                  <Button data-testid="button-create-first-publication">
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first publication
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((publication) => (
                  <TableRow key={publication.id} data-testid={`row-publication-${publication.id}`}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{publication.title}</div>
                        {publication.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-md">
                            {publication.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={publication.published ? "default" : "secondary"}>
                        {publication.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {publication.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {publication.author && (
                        <div className="text-sm">{publication.author}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {publication.publication_date ? (
                          <>
                            <div>{new Date(publication.publication_date).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">
                              {formatDistanceToNow(new Date(publication.publication_date), { addSuffix: true })}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground">No date set</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublished(publication.id, publication.published)}
                          disabled={togglePublishedMutation.isPending}
                          data-testid={`button-toggle-published-${publication.id}`}
                        >
                          {publication.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Link href={`/admin/publications/edit/${publication.id}`}>
                          <Button variant="outline" size="sm" data-testid={`button-edit-${publication.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(publication.id, publication.title)}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-${publication.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}