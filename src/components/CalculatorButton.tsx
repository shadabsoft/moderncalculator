
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'number' | 'operator' | 'function' | 'equals';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
  doubleWidth?: boolean;
}

const CalculatorButton = ({ 
  value, 
  onClick, 
  variant = 'number',
  className, 
  children,
  doubleWidth = false
}: CalculatorButtonProps) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <div 
      className={cn(
        'calculator-key',
        variant === 'number' && 'number-key',
        variant === 'operator' && 'operator-key',
        variant === 'function' && 'function-key',
        variant === 'equals' && 'equals-key',
        doubleWidth ? 'col-span-2 w-full !aspect-auto' : 'aspect-square',
        className
      )}
      onClick={handleClick}
    >
      {children || value}
    </div>
  );
};

export default CalculatorButton;
