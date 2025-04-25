import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { TabNavigation } from '@/components/tab-navigation';
import { columns } from '@/components/teams/member/columns';
import { MemberActions } from '@/components/teams/member/member-modal';
import { Button } from '@/components/ui/button';
import { getTeamSettingsTabs } from '@/config/teams/tabs-team-settings';
import { useModalRoute } from '@/hooks/use-modal-route';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Member as MemberType, Team } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { IconPlus } from '@tabler/icons-react';

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

    const { close, modal } = useModalRoute();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={team.name} />
            <div className="space-y-6 p-4">
                <Heading title="Team Settings" />

                <div className="mb-3 flex items-center justify-between">
                    <TabNavigation tabs={tabs} activeTab="member" className="mb-0" />
                    <Link href={route('teams.members.create', team.hashid)}>
                        <Button variant="outline" size="sm">
                            <IconPlus />
                            <span className="hidden lg:inline">Invite member</span>
                        </Button>
                    </Link>
                </div>

                <DataTable data={members} columns={columns} />

                {(modal === 'create' || modal == 'edit') && <MemberActions onClose={close} />}
            </div>
        </AppLayout>
    );
}
