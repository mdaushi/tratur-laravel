import { Heading } from '@/components/heading';
import { TabNavigation } from '@/components/tab-navigation';
import { getTeamSettingsTabs } from '@/config/teams/tabs-team-settings';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Team } from '@/types';
import { Head } from '@inertiajs/react';

interface MemberProps {
    team: Team;
}

export default function Member({ team }: MemberProps) {
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
            </div>
        </AppLayout>
    );
}
