import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Bell, 
  User, 
  Menu,
  X
} from "lucide-react";

interface HeaderProps {
  currentUser?: {
    name: string;
    role: 'student' | 'admin';
  };
}

const Header = ({ currentUser }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow animate-glow">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CampusLink</h1>
              <p className="text-xs text-muted-foreground">Student Utility Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                className={`text-muted-foreground hover:text-foreground ${
                  location.pathname === '/dashboard' ? 'text-primary bg-primary/10' : ''
                }`}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/announcements">
              <Button 
                variant="ghost" 
                className={`text-muted-foreground hover:text-foreground ${
                  location.pathname === '/announcements' ? 'text-primary bg-primary/10' : ''
                }`}
              >
                Announcements
              </Button>
            </Link>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Lost & Found
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Timetable
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Complaints
            </Button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-xs text-white rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Profile */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="campus" size="sm">
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-muted-foreground hover:text-foreground ${
                    location.pathname === '/dashboard' ? 'text-primary bg-primary/10' : ''
                  }`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/announcements">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-muted-foreground hover:text-foreground ${
                    location.pathname === '/announcements' ? 'text-primary bg-primary/10' : ''
                  }`}
                >
                  Announcements
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                Lost & Found
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                Timetable
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                Complaints
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;