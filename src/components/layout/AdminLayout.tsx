import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  const sidebarWidthClass = 'w-64'; // Corresponds to 256px as per Layout Requirements
  const topHeaderHeight = '70px';

  // In a real app with collapsible sidebar, these would be dynamic:
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  // const currentSidebarWidthClass = isSidebarCollapsed ? 'w-20' : sidebarWidthClass;
  // const mainContentMarginLeft = isSidebarCollapsed ? 'ml-20' : 'ml-64';
  // const topHeaderLeftOffset = isSidebarCollapsed ? 'left-20' : 'left-64';
  // const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <SidebarNav className={sidebarWidthClass} />
      
      {/* Content area to the right of the sidebar */}
      <div className={cn("transition-all duration-300 ease-in-out", "ml-64")}>
        <TopHeader 
          className={cn("left-64")} 
          // onToggleSidebar={toggleSidebar} // Pass toggle function if sidebar was collapsible
        />
        <main 
          className="p-6" 
          style={{ marginTop: topHeaderHeight }} // Dynamic margin for fixed header
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
