import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TicketsPage() {
  const tickets = [
    { id: 1, title: "Fix login bug", priority: "High", status: "Open", assignee: "John Doe" },
    { id: 2, title: "Update documentation", priority: "Medium", status: "In Progress", assignee: "Jane Smith" },
    { id: 3, title: "Add dark mode", priority: "Low", status: "Open", assignee: "Mike Johnson" },
    { id: 4, title: "Optimize performance", priority: "High", status: "Review", assignee: "Sarah Wilson" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "default";
      case "In Progress": return "secondary";
      case "Review": return "outline";
      case "Closed": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tickets</h1>
          <p className="text-muted-foreground">Manage and track your tickets</p>
        </div>
        <Button>Create New Ticket</Button>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ticket.title}</CardTitle>
                  <CardDescription>Ticket #{ticket.id}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                  <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Assigned to: {ticket.assignee}</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
