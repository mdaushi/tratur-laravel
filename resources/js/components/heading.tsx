import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function Heading({ title, description, children }: PropsWithChildren<{ title: string; description?: string }>) {
    return (
        <div className="mb-8 flex items-center justify-between space-y-0.5">
            <div>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
            {children}
        </div>
    );
}

export function HeadingAction({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />;
}
