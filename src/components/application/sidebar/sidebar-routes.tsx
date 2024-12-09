import { usePathname } from 'next/navigation';
import { SidebarItem, SidebarLabel } from '../../ui/sidebar';
import {
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';

function SidebarRoute({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const currentUrl = usePathname();

  return (
    <SidebarItem current={currentUrl === href} href={href}>
      {children}
    </SidebarItem>
  );
}

function SidebarRoutes() {
  return (
    <>
      <SidebarRoute href="/dashboard">
        <HomeIcon />
        <SidebarLabel>Home</SidebarLabel>
      </SidebarRoute>
      <SidebarRoute href="/records">
        <Square2StackIcon />
        <SidebarLabel>Records</SidebarLabel>
      </SidebarRoute>
      <SidebarRoute href="/#">
        <TicketIcon />
        <SidebarLabel>Todo</SidebarLabel>
      </SidebarRoute>
      <SidebarRoute href="/settings">
        <Cog6ToothIcon />
        <SidebarLabel>Settings</SidebarLabel>
      </SidebarRoute>
    </>
  );
}
export default SidebarRoutes;
