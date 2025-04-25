import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SharedData } from '@/types';
import { MemberFormType } from '@/types/forms/member';
import { usePage } from '@inertiajs/react';
import { Form } from 'laravel-precognition-react-inertia';
import { FormEvent } from 'react';

interface FormMemberProps {
    handler: (e: FormEvent) => void;
    form: Form<MemberFormType>;
}

export function FormMember({ handler, form }: FormMemberProps) {
    const { roles: rolesProps } = usePage<SharedData>().props;

    const roles = rolesProps as { id: number; name: string }[];

    return (
        <form id="form-invite-member" onSubmit={handler} className="space-y-2">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    placeholder="enter email address"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                    autoComplete="off"
                />
                {form.invalid('email') && <p className="text-destructive text-sm">{form.errors.email}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={form.data.role_id?.toString()} onValueChange={(e) => form.setData('role_id', Number(e))}>
                    <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="select role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()} className="capitalize">
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {form.invalid('role_id') && <p className="text-destructive text-sm">{form.errors.role_id}</p>}
            </div>
        </form>
    );
}
