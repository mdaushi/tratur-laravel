import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    teams: { all: TeamBase[]; current: TeamBase };
    can: {
        [key: string]: boolean;
    };
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
    flash: {
        success: string;
        error: string;
        info: string;
        warning: string;
    };
    modal: ModalRoute;
    [key: string]: unknown;
    permissions: {
        [key: string]: boolean;
    };
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
    hashid: string;
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
    status: MemberStatus;
}

export type MemberStatus = 'pending' | 'accepted' | 'declined';

export type ModalRoute = 'create' | 'edit' | null;
