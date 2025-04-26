import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FocusHeaderLayout from '@/layouts/other/focus-header-layout';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function NewTeam() {
    const form = useForm('post', route('new.store'), {
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit({
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => {
                if (Object.keys(errors)[0] === 'error') {
                    toast.error(errors.error[0]);
                }
            },
        });
    };

    return (
        <FocusHeaderLayout>
            <Head title="New" />
            <div className="flex items-start justify-center p-4">
                <Card className="w-full max-w-[600px]">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle className="text-xl font-medium">Create a new team</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-sm">This is your team within Tratur.</p>
                                <p className="text-sm">For example, you can use the name of your company or department.</p>
                            </div>
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
                        <CardFooter className="flex justify-between pt-4">
                            <Button variant="ghost" type="button" onClick={() => history.back()}>
                                Cancel
                            </Button>
                            <div className="flex items-center gap-4">
                                <p className="text-xs text-zinc-400">You can rename your team later</p>
                                <Button type="submit" disabled={form.processing}>
                                    {form.processing && <Loader2 className="mr-1 animate-spin" />}
                                    Create team
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </FocusHeaderLayout>
    );
}
