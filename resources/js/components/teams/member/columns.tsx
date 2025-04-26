import { Badge } from '@/components/ui/badge';
import { Member } from '@/types';
import { IconLoader, IconX } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-action';

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const status = row.original.status;
            const isPending = status === 'pending';
            const isDeclined = status === 'declined';
            const showBadge = isPending || isDeclined;

            return (
                <div className="flex items-center gap-2">
                    <p>{row.original.name}</p>
                    {showBadge && (
                        <Badge variant={isPending ? 'outline' : 'destructive'} className="flex items-center gap-1">
                            {isPending ? <IconLoader /> : <IconX />}
                            <span className="capitalize">{status}</span>
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <span className="capitalize">
                <Badge variant="outline">{row.getValue('role')}</Badge>
            </span>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
