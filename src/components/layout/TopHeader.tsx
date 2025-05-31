import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Search,
  Globe,
  LayoutGrid,
  Bell,
  Maximize,
  Moon,
  Sun,
  User, // Example for user dropdown items
  LogOut // Example for user dropdown items
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  // onToggleSidebar?: () => void; // For collapsible sidebar, not implemented per current fixed width req
}

const TopHeader: React.FC<TopHeaderProps> = ({ className /*, onToggleSidebar */ }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false); // Example state for theme toggle

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would call a theme context method
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <header 
      className={cn(
        "bg-surface border-b border-border flex items-center justify-between px-6 shadow-sm", 
        "h-[70px] fixed top-0 right-0 z-10", // Fixed position, takes full width to the right of sidebar
        className
      )}
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-3 text-muted-foreground hover:text-foreground lg:hidden" 
          // onClick={onToggleSidebar} // For future collapsible sidebar
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Breadcrumbs/Page Title - Simplified */}
        <div className="hidden md:block">
          <h5 className="text-base font-semibold text-foreground">CRM</h5>
          <p className="text-xs text-muted-foreground">Dashboards &gt; CRM</p>
        </div>

        {/* Search Bar - Simplified as visual placeholder */}
        <div className="relative ml-6 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 h-9 w-60 bg-muted/50 border-transparent rounded-md focus:bg-background focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Language Switch Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-9 h-9">
              <Globe className="h-5 w-5" /> {/* Using Globe as a placeholder for a flag icon */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Apps/Grid Dropdown */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-9 h-9">
          <LayoutGrid className="h-5 w-5" />
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground w-9 h-9">
              <Bell className="h-5 w-5" />
              <Badge className="absolute top-1.5 right-1.5 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-velzon-accentRed text-white rounded-full">5</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New user registered</DropdownMenuItem>
            <DropdownMenuItem>Server #1 overloaded</DropdownMenuItem>
            <DropdownMenuItem>License expiring soon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fullscreen Toggle */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-9 h-9 hidden sm:inline-flex">
          <Maximize className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground w-9 h-9">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* User profile is in SidebarNav per requirements, so not duplicated here */}
      </div>
    </header>
  );
};

export default TopHeader;
