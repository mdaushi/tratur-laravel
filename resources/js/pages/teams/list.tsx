import { DataTable } from '@/components/data-table';
import { Heading, HeadingAction } from '@/components/heading';
import { columns } from '@/components/teams/columns';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Team } from '@/types';
import { Deferred, Head, Link } from '@inertiajs/react';
import { IconPlus } from '@tabler/icons-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teams',
        href: '/teams',
    },
];

interface ListProps {
    teams: Team[];
}

export default function List({ teams }: ListProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teams" />

            <div className="space-y-6 p-4">
                <Heading title="Organizations" description="Manage your organizations and their access controls">
                    <HeadingAction>
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('new.index')} prefetch>
                                <IconPlus />
                                <span className="hidden lg:inline">New Organization</span>
                            </Link>
                        </Button>
                    </HeadingAction>
                </Heading>

                <Deferred data="teams" fallback={<Loading />}>
                    <DataTable data={teams} columns={columns} />
                </Deferred>
            </div>
        </AppLayout>
    );
}

function Loading() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-[125px]" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
        </div>
    );
}
