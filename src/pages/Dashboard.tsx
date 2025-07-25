import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Search, 
  Calendar, 
  FileText,
  Plus,
  Clock,
  MapPin,
  User,
  TrendingUp,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const quickStats = [
    { label: "New Announcements", value: "5", icon: Megaphone, color: "text-info" },
    { label: "Lost Items Found", value: "12", icon: Search, color: "text-success" },
    { label: "Today's Classes", value: "6", icon: Calendar, color: "text-warning" },
    { label: "Open Complaints", value: "2", icon: FileText, color: "text-destructive" }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Mid-term Examination Schedule Released",
      content: "The mid-term examination schedule for all departments has been published.",
      time: "2 hours ago",
      priority: "high",
      category: "Academic"
    },
    {
      id: 2,
      title: "Library Extended Hours",
      content: "Library will be open 24/7 during exam weeks starting next Monday.",
      time: "5 hours ago",
      priority: "medium",
      category: "Facility"
    },
    {
      id: 3,
      title: "Campus Fest Registration Open",
      content: "Registration for annual campus cultural fest is now open. Limited slots available.",
      time: "1 day ago",
      priority: "low",
      category: "Events"
    }
  ];

  const upcomingClasses = [
    { subject: "Data Structures", time: "10:00 AM", room: "CS-101", professor: "Dr. Smith" },
    { subject: "Database Management", time: "02:00 PM", room: "CS-205", professor: "Prof. Johnson" },
    { subject: "Software Engineering", time: "04:00 PM", room: "CS-301", professor: "Dr. Williams" }
  ];

  const recentActivity = [
    { action: "Found item reported", item: "Blue Backpack", time: "30 min ago", type: "found" },
    { action: "Complaint resolved", item: "AC Repair - Room 204", time: "2 hours ago", type: "resolved" },
    { action: "New announcement", item: "Exam Schedule", time: "3 hours ago", type: "announcement" }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-white/90">Here's what's happening on campus today</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">23°C</div>
              <div className="text-sm text-white/80">Sunny</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg group-hover:animate-glow">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Announcements */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <Megaphone className="h-5 w-5 mr-2 text-primary" />
                Recent Announcements
              </h2>
              <Button variant="campus-outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-4 bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={announcement.priority === 'high' ? 'destructive' : announcement.priority === 'medium' ? 'default' : 'secondary'}>
                        {announcement.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{announcement.time}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div>
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Today's Classes
              </h2>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground text-sm">{cls.subject}</h3>
                    <Badge variant="outline" className="text-xs">
                      {cls.time}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground space-x-3">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {cls.room}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {cls.professor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'found' ? 'bg-success/20 text-success' :
                    activity.type === 'resolved' ? 'bg-info/20 text-info' :
                    'bg-warning/20 text-warning'
                  }`}>
                    {activity.type === 'found' ? <Search className="h-3 w-3" /> :
                     activity.type === 'resolved' ? <FileText className="h-3 w-3" /> :
                     <Bell className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="campus-outline" className="h-20 flex-col space-y-2">
            <Megaphone className="h-6 w-6" />
            <span className="text-sm">Post Announcement</span>
          </Button>
          <Button variant="campus-outline" className="h-20 flex-col space-y-2">
            <Search className="h-6 w-6" />
            <span className="text-sm">Report Lost Item</span>
          </Button>
          <Button variant="campus-outline" className="h-20 flex-col space-y-2">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Add Class</span>
          </Button>
          <Button variant="campus-outline" className="h-20 flex-col space-y-2">
            <FileText className="h-6 w-6" />
            <span className="text-sm">File Complaint</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;