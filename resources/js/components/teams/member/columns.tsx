import { Member } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <span className="capitalize">{row.getValue('role')}</span>,
    },
];
