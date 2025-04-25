import { TabItem } from '@/components/tab-navigation';

export function getTeamSettingsTabs(teamId: string): TabItem[] {
    return [
        {
            label: 'General',
            value: 'general',
            href: route('teams.general.edit', teamId),
        },
        {
            label: 'Member',
            value: 'member',
            href: route('teams.members.index', teamId),
        },
    ];
}
