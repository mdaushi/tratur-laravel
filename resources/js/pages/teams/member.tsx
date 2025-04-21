import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { TabNavigation } from '@/components/tab-navigation';
import { columns } from '@/components/teams/member/columns';
import { getTeamSettingsTabs } from '@/config/teams/tabs-team-settings';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Member as MemberType, Team } from '@/types';
import { Head } from '@inertiajs/react';

interface MemberProps {
    team: Team;
    members: MemberType[];
}

export default function Member({ team, members }: MemberProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Teams',
            href: '/teams',
        },
        {
            title: team.name,
            href: '',
        },
    ];

    const tabs = getTeamSettingsTabs(team.hashid);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={team.name} />
            <div className="space-y-6 p-4">
                <Heading title="Team Settings" />

                <TabNavigation tabs={tabs} activeTab="member" />

                <DataTable data={members} columns={columns} />
            </div>
        </AppLayout>
    );
}
