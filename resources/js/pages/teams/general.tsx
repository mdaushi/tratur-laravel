import { Heading } from '@/components/heading';
import { TabNavigation } from '@/components/tab-navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getTeamSettingsTabs } from '@/config/teams/tabs-team-settings';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Team } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { Loader2 } from 'lucide-react';
import { FormEvent } from 'react';

interface GeneralProps {
    team: Team;
}

export default function General({ team }: GeneralProps) {
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

    const form = useForm('put', route('teams.general.update', { team: team.hashid }), {
        name: team.name,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.submit({
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                form.reset();
                form.clearErrors();
            },
        });
    };

    const cancelSubmit = () => {
        form.reset();
        form.clearErrors();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={team.name} />

            <div className="space-y-6 p-4">
                <Heading title="Team Settings" />

                <TabNavigation tabs={tabs} activeTab="general" />

                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit} className="w-full">
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="team name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                    />

                                    <p className="text-xs text-zinc-400">What&apos;s the name of your company or team?</p>
                                    {form.invalid('name') && <p className="text-destructive text-sm">{form.errors.name}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-end gap-2 pt-4">
                            <Button variant="secondary" type="button" onClick={cancelSubmit} disabled={team.name === form.data.name}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.processing || team.name === form.data.name}>
                                {form.processing && <Loader2 className="mr-1 animate-spin" />}
                                Save
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
