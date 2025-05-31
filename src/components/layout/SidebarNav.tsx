import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  BarChartHorizontalBig,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  Image as ImageIcon, // Renamed to avoid conflict with HTMLImageElement
  Briefcase,
  BookOpen,
  Grid3x3,
  LayoutPanelLeft,
  FileText,
  Lock,
  Blocks,
  Box,
  Move,
  Puzzle,
  ClipboardList,
  Settings,
  ChevronDown,
  Dot
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isNew?: boolean;
  isHot?: boolean;
  active?: boolean;
  children?: NavItem[];
  defaultOpen?: boolean;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    active: true, // To match screenshot, CRM is under an open Dashboards
    defaultOpen: true,
    children: [
      { id: 'analytics', label: 'Analytics', icon: Dot, href: '/analytics' },
      { id: 'crm', label: 'CRM', icon: Dot, href: '/crm', active: true }, // Active item
      { id: 'ecommerce', label: 'Ecommerce', icon: Dot, href: '/ecommerce' },
      { id: 'crypto', label: 'Crypto', icon: Dot, href: '/crypto' },
      { id: 'projects', label: 'Projects', icon: Dot, href: '/projects' },
      { id: 'nft', label: 'NFT', icon: Dot, href: '/nft' },
      { id: 'job', label: 'Job', icon: Dot, href: '/job' },
    ],
  },
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog', isNew: true },
  {
    id: 'apps',
    label: 'Apps',
    icon: Grid3x3,
    children: [
      { id: 'calendar', label: 'Calendar', icon: Dot, href: '/apps/calendar' },
      { id: 'chat', label: 'Chat', icon: Dot, href: '/apps/chat' },
    ],
  },
  { id: 'layouts', label: 'Layouts', icon: LayoutPanelLeft, href: '/layouts', isHot: true },
  {
    id: 'pagesSection',
    label: 'PAGES',
    icon: FileText, // Not a clickable item, but a section header if needed
    isHeader: true,
  } as NavItem & { isHeader?: boolean }, // Type assertion for custom property
  {
    id: 'authentication',
    label: 'Authentication',
    icon: Lock,
    children: [
      { id: 'signin', label: 'Sign In', icon: Dot, href: '/auth/signin' },
      { id: 'signup', label: 'Sign Up', icon: Dot, href: '/auth/signup' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    children: [
      { id: 'starter', label: 'Starter', icon: Dot, href: '/pages/starter' },
      { id: 'profile', label: 'Profile', icon: Dot, href: '/pages/profile' },
    ],
  },
  {
    id: 'landing',
    label: 'Landing',
    icon: LayoutPanelLeft, // Using LayoutPanelLeft as a generic page icon
    href: '/landing',
  },
  {
    id: 'componentsSection',
    label: 'COMPONENTS',
    icon: Blocks,
    isHeader: true,
  } as NavItem & { isHeader?: boolean },
  {
    id: 'base-ui',
    label: 'Base UI',
    icon: Box,
    children: [
      { id: 'alerts', label: 'Alerts', icon: Dot, href: '/components/alerts' },
      { id: 'buttons', label: 'Buttons', icon: Dot, href: '/components/buttons' },
    ],
  },
  {
    id: 'advance-ui',
    label: 'Advance UI',
    icon: Move,
    children: [
      { id: 'modals', label: 'Modals', icon: Dot, href: '/components/modals' },
      { id: 'notifications', label: 'Notifications', icon: Dot, href: '/components/notifications' },
    ],
  },
  { id: 'widgets', label: 'Widgets', icon: Puzzle, href: '/components/widgets' },
  {
    id: 'forms',
    label: 'Forms',
    icon: ClipboardList,
    children: [
      { id: 'basic-elements', label: 'Basic Elements', icon: Dot, href: '/forms/basic' },
      { id: 'validation', label: 'Validation', icon: Dot, href: '/forms/validation' },
    ],
  },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNavItem: React.FC<{ item: NavItem; isSubmenu?: boolean }> = ({ item, isSubmenu = false }) => {
  const Icon = item.icon;
  const activeClasses = "bg-sidebar-accent text-white font-semibold relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-velzon-accentBlue before:rounded-r-md";
  const itemPadding = isSubmenu ? "pl-10 pr-3 py-2" : "px-3 py-2.5";

  return (
    <a
      href={item.href || '#'}
      className={cn(
        "flex items-center text-sm rounded-md transition-colors duration-150",
        itemPadding,
        item.active 
          ? activeClasses
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70",
        isSubmenu && item.active && "text-white",
        isSubmenu && !item.active && "hover:text-sidebar-foreground"
      )}
    >
      <Icon className={cn("h-4 w-4 mr-3", isSubmenu && item.icon === Dot ? "h-2 w-2" : "")}/>
      <span>{item.label}</span>
      {item.isNew && (
        <Badge variant="default" className="ml-auto bg-velzon-accentGreen text-primary-foreground text-[10px] px-1.5 py-0.5 h-auto leading-tight">New</Badge>
      )}
      {item.isHot && (
        <Badge variant="default" className="ml-auto bg-velzon-accentRed text-primary-foreground text-[10px] px-1.5 py-0.5 h-auto leading-tight">Hot</Badge>
      )}
    </a>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const defaultActiveItems = navigationItems.filter(item => item.defaultOpen && item.children).map(item => item.id);

  return (
    <aside className={cn("bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed top-0 left-0 z-20", className)}>
      <div className="p-4 h-[70px] flex items-center justify-center border-b border-sidebar-border/10 shrink-0">
        <h1 className="text-2xl font-bold text-white tracking-wider">VELZON</h1>
      </div>

      <div className="p-4 flex items-center shrink-0">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
          <AvatarFallback className="bg-velzon-accentBlue text-white">AA</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-white">Anna Adame</p>
          <div className="flex items-center mt-0.5">
            <span className="h-2 w-2 bg-velzon-accentGreen rounded-full mr-1.5"></span>
            <p className="text-xs text-green-300">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-grow px-3 mt-2">
        <nav className="space-y-1 pb-4">
          {navigationItems.map((item) => {
            if ((item as NavItem & { isHeader?: boolean }).isHeader) {
              return (
                <p key={item.id} className="px-1 pt-3 pb-1 text-xs uppercase text-sidebar-foreground/50 tracking-wider font-semibold">
                  {item.label}
                </p>
              );
            }
            if (item.children && item.children.length > 0) {
              return (
                <Accordion key={item.id} type="single" collapsible defaultValue={item.defaultOpen ? item.id : undefined} className="w-full">
                  <AccordionItem value={item.id} className="border-b-0">
                    <AccordionTrigger 
                      className={cn(
                        "flex items-center w-full text-sm rounded-md px-3 py-2.5 hover:no-underline hover:bg-sidebar-accent/70",
                        item.active ? "text-white font-semibold" : "text-sidebar-foreground/80 hover:text-sidebar-foreground",
                        "[&[data-state=open]>svg.lucide-chevron-down]:rotate-180"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.label}</span>
                      {item.isNew && (
                        <Badge variant="default" className="ml-auto mr-2 bg-velzon-accentGreen text-primary-foreground text-[10px] px-1.5 py-0.5 h-auto leading-tight">New</Badge>
                      )}
                      {item.isHot && (
                        <Badge variant="default" className="ml-auto mr-2 bg-velzon-accentRed text-primary-foreground text-[10px] px-1.5 py-0.5 h-auto leading-tight">Hot</Badge>
                      )}
                      <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-foreground/50 transition-transform duration-200 ml-auto" />
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 pb-0 space-y-0.5">
                      {item.children.map((child) => (
                        <SidebarNavItem key={child.id} item={child} isSubmenu={true} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }
            return <SidebarNavItem key={item.id} item={item} />;
          })}
        </nav>
      </ScrollArea>

      <div className="p-3 mt-auto border-t border-sidebar-border/10 shrink-0">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70 px-3 py-2.5">
          <Settings className="mr-3 h-4 w-4" /> Settings
        </Button>
      </div>
    </aside>
  );
};

export default SidebarNav;
