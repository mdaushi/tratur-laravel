import { useForm } from 'laravel-precognition-react-inertia';
import { Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

interface DeleteConfirmationProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    teamName: string;
    confirmationCode: string;
}

export function DeleteConfirmation({ isOpen, setIsOpen, teamName, confirmationCode }: DeleteConfirmationProps) {
    const teamId = confirmationCode;

    const form = useForm('delete', route('teams.destroy', teamId), {
        confirmationCode: '',
    });

    const isValid = form.data.confirmationCode === confirmationCode;

    const handleDelete = (e: FormEvent) => {
        e.preventDefault();

        form.submit({
            onSuccess: () => {
                form.reset();
                setIsOpen(false);
            },
        });
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Delete team <span className="text-muted-foreground text-sm">Are you sure?</span>
                    </DialogTitle>
                    <DialogDescription>
                        This action <span className="font-semibold">cannot</span> be undone. This will permanently delete the{' '}
                        <span className="font-semibold">{teamName}</span> team and remove all of its datas.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-2">
                    <form onSubmit={handleDelete} className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm">
                                Please type <span className="font-mono font-bold">{confirmationCode}</span> to confirm
                            </p>
                            <Input
                                placeholder="Enter the string above"
                                value={form.data.confirmationCode}
                                onChange={(e) => form.setData('confirmationCode', e.target.value)}
                                className="bg-background/50 border-border"
                            />
                            {form.invalid('confirmationCode') && <p className="text-destructive text-sm">{form.errors.confirmationCode}</p>}
                        </div>
                        <Button
                            variant="destructive"
                            disabled={!isValid || form.processing}
                            className="bg-destructive/90 hover:bg-destructive w-full"
                        >
                            {form.processing && <Loader2 className="animate-spin" />}I understand, delete this team
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
