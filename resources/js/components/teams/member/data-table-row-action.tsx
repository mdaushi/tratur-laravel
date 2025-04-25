import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Member } from '@/types';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface DataTableRowActionsProps<TData extends Member> {
    row: Row<TData>;
}

export function DataTableRowActions<TData extends Member>({ row }: DataTableRowActionsProps<TData>) {
    const member = row.original;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Change role</DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Remove from team</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
