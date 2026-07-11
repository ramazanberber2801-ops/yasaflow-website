import {
  Bell,
  CalendarDays,
  CircleDollarSign,
  MessageCircle,
  Newspaper,
  Package,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

const moduleIcons: Record<string, LucideIcon> = {
  bell: Bell,
  'calendar-days': CalendarDays,
  'circle-dollar-sign': CircleDollarSign,
  'message-circle': MessageCircle,
  newspaper: Newspaper,
  settings: Settings,
  'shield-check': ShieldCheck,
  users: Users,
};

export function getModuleIcon(icon: string): LucideIcon {
  return moduleIcons[icon] ?? Package;
}
