import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { type NavItem } from '@/types';
import { IconBrightness } from '@tabler/icons-react';
import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { Skeleton } from './ui/skeleton';
import { Switch } from './ui/switch';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const { appearance, updateAppearance } = useAppearance();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                            >
                                <a href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                        <SidebarMenuButton asChild>
                            <label>
                                <IconBrightness />
                                <span>Dark Mode</span>
                                {mounted ? (
                                    <Switch
                                        className="ml-auto"
                                        checked={appearance !== 'light'}
                                        onCheckedChange={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                                    />
                                ) : (
                                    <Skeleton className="ml-auto h-4 w-8 rounded-full" />
                                )}
                            </label>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
