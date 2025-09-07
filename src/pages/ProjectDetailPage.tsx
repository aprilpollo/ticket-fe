import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Website Redesign</h1>
        <p className="text-muted-foreground">Project #{id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete redesign of the company website with modern UI/UX principles. 
                This project includes responsive design, improved accessibility, and 
                enhanced user experience.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Homepage design completed</p>
                    <p className="text-xs text-muted-foreground">John Doe - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Mobile responsive layout updated</p>
                    <p className="text-xs text-muted-foreground">Jane Smith - 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Project milestone reached</p>
                    <p className="text-xs text-muted-foreground">Mike Johnson - 2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm text-muted-foreground">Mar 30, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">Budget</p>
                <p className="text-sm text-muted-foreground">$50,000</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">John Doe</span>
                  <Badge variant="outline">Lead</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Jane Smith</span>
                  <Badge variant="outline">Designer</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mike Johnson</span>
                  <Badge variant="outline">Developer</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Edit Project</Button>
              <Button variant="outline" className="w-full">Add Member</Button>
              <Button variant="outline" className="w-full">View Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
