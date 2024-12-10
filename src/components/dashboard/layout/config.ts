import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  // { key: 'instutions', title: 'Institutions', href: paths.dashboard.instutions.overview, icon: 'users' },
  { key: 'sessions', title: 'Sessions', href: paths.dashboard.Sessions.overview, icon: 'users' },
  { key: 'trainers', title: 'Trainers', href: paths.dashboard.trainers.overview, icon: 'users' },
] satisfies NavItemConfig[];

export const instutionsNavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'sessions', title: 'Sessions', href: paths.dashboard.Sessions.overview, icon: 'users' },
  { key: 'trainers', title: 'Trainers', href: paths.dashboard.trainers.overview, icon: 'users' },
] satisfies NavItemConfig[];

export const regulatoryBodyNavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'instutions', title: 'Institutions', href: paths.dashboard.instutions.overview, icon: 'users' },
] satisfies NavItemConfig[];
