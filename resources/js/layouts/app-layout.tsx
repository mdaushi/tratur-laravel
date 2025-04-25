import { useIsMobile } from '@/hooks/use-mobile';
import useFlashToast from '@/hooks/useFlashToast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    useFlashToast();

    const isMobile = useIsMobile();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position={isMobile ? 'top-right' : 'bottom-center'} />
        </AppLayoutTemplate>
    );
};
