import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
    fallbackUrl: string;
    className?: string;
}

export default function BackButton({
    fallbackUrl,
    className,
}: BackButtonProps) {
    const handleBack = () => {
        if (
            typeof window !== 'undefined' &&
            window.document.referrer &&
            window.document.referrer.includes(window.location.host)
        ) {
            window.history.back();
        } else {
            router.visit(fallbackUrl);
        }
    };

    return (
        <button
            onClick={handleBack}
            className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/30 bg-transparent px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-border/60 hover:bg-muted/10 hover:text-foreground',
                className,
            )}
            style={{
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
            }}
        >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
        </button>
    );
}
