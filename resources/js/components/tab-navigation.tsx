import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export interface TabItem {
    label: string;
    value: string;
    href: string;
}

interface TabNavigationProps {
    tabs: TabItem[];
    activeTab: string;
    className?: string;
}
export function TabNavigation({ tabs, activeTab, className }: TabNavigationProps) {
    return (
        <Tabs value={activeTab} className={cn('w-full', className)}>
            <TabsList>
                {tabs.map((tab) => (
                    <Link href={tab.href} key={tab.value} className="w-full">
                        <TabsTrigger value={tab.value} className="w-full hover:cursor-pointer" data-active={activeTab === tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    </Link>
                ))}
            </TabsList>
        </Tabs>
    );
}
