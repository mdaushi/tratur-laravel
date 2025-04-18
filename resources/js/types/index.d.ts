import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    teams: { all: TeamBase[]; current: TeamBase };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface TeamBase {
    id: number;
    name: string;
    description: string;
}

export interface Team extends TeamBase {
    memberCount: number;
    roleCount: number;
    members: Member[];
    availableRoles: Role[];
}

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    userCount: number;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    status: 'Active' | 'Pending' | 'Suspended';
}
