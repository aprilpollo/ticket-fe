import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const projects = [
    { 
      id: 1, 
      name: "Website Redesign", 
      description: "Complete redesign of company website", 
      status: "Active", 
      progress: 75,
      team: ["John Doe", "Jane Smith", "Mike Johnson"]
    },
    { 
      id: 2, 
      name: "Mobile App", 
      description: "New mobile application development", 
      status: "Active", 
      progress: 45,
      team: ["Sarah Wilson", "Tom Brown", "Lisa Davis"]
    },
    { 
      id: 3, 
      name: "API Integration", 
      description: "Third-party API integration project", 
      status: "Planning", 
      progress: 10,
      team: ["Alex Green", "Emma White"]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Planning": return "secondary";
      case "Completed": return "outline";
      case "On Hold": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and teams</p>
        </div>
        <Button>Create New Project</Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </div>
                <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Team Members:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
