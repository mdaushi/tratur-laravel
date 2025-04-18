import { Team } from '@/types';
import { IconUsers } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { DataTableRowActions } from './data-table-row-action';

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'memberCount',
        header: 'Member',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <IconUsers className="size-4" />
                    {row.getValue('memberCount')}
                </div>
            );
        },
    },
    {
        accessorKey: 'roleCount',
        header: 'Roles',
        cell: ({ row }) => {
            return (
                <Badge variant="outline" className="flex items-center gap-2">
                    {row.getValue('roleCount')}
                    <span className="hidden lg:inline">roles</span>
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
