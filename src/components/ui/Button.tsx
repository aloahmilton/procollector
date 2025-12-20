import * as React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'white';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] uppercase tracking-wider",

                    // Variants
                    variant === 'primary' && "bg-brand-green text-white hover:bg-brand-green-dark shadow-lg shadow-brand-green/20 border-none",
                    variant === 'secondary' && "bg-brand-dark text-white hover:bg-brand-dark-soft shadow-lg",
                    variant === 'outline' && "border-2 border-brand-dark bg-transparent text-brand-dark hover:bg-brand-dark hover:text-white",
                    variant === 'destructive' && "bg-rose-600 text-white hover:bg-rose-700 shadow-lg",
                    variant === 'ghost' && "text-inherit hover:bg-white/10 hover:text-white",
                    variant === 'white' && "bg-white text-brand-dark hover:bg-brand-dustGold shadow-xl",

                    // Sizes
                    size === 'default' && "h-12 px-8",
                    size === 'sm' && "h-10 px-6 text-xs",
                    size === 'lg' && "h-16 px-12 text-base rounded-2xl",
                    size === 'icon' && "h-12 w-12",

                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
