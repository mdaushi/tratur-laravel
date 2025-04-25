import { Button } from '@/components/ui/button';
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from '@/components/ui/credenza';
import { SharedData } from '@/types';
import { MemberFormType } from '@/types/forms/member';
import { usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { toast } from 'sonner';
import { FormMember } from './form';

interface MemberActionsProps {
    onClose: () => void;
}

export function MemberActions({ onClose }: MemberActionsProps) {
    const { auth } = usePage<SharedData>().props;

    const form = useForm<MemberFormType>('post', route('teams.members.store', auth.teams.current.hashid), {
        email: '',
        role_id: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.submit({
            preserveScroll: true,
            onSuccess: () => {
                onClose();
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
        <Credenza open={true} onOpenChange={onClose}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Invite member</CredenzaTitle>
                    <CredenzaDescription>Invite a member to this team</CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                    <FormMember handler={handleSubmit} form={form} />
                </CredenzaBody>
                <CredenzaFooter>
                    <Button form="form-invite-member" className="w-full cursor-pointer">
                        Send Invitation
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
}
