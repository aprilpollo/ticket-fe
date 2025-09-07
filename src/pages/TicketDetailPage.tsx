import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ticket #{id}</h1>
        <p className="text-muted-foreground">Fix login bug</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Users are experiencing issues with the login functionality. The login button 
                is not responding when clicked, and some users are getting authentication errors 
                even with correct credentials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm">This issue was reported by the QA team during testing.</p>
                  <p className="text-xs text-muted-foreground mt-1">John Doe - 2 hours ago</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="text-sm">I'll investigate the authentication service.</p>
                  <p className="text-xs text-muted-foreground mt-1">Jane Smith - 1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant="default">Open</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Priority</p>
                <Badge variant="destructive">High</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Assignee</p>
                <p className="text-sm text-muted-foreground">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Edit Ticket</Button>
              <Button variant="outline" className="w-full">Add Comment</Button>
              <Button variant="outline" className="w-full">Assign to Me</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
