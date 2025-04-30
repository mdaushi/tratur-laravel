import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const can = (action: string, permissions: Record<string, boolean>) => {
    return permissions[action] === true;
};
