import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function ProductList() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
        </AppLayout>
    );
}
