
import { cn } from '@/lib/utils';

interface CalculatorDisplayProps {
  input: string;
  result: string;
  history: string[];
}

const CalculatorDisplay = ({ input, result, history }: CalculatorDisplayProps) => {
  return (
    <div className="bg-calculator-display rounded-t-2xl p-4 text-right h-48 flex flex-col justify-end overflow-hidden">
      <div className="h-20 overflow-y-auto text-right mb-2 scrollbar-thin scrollbar-thumb-gray-500">
        {history.length > 0 && (
          <div className="flex flex-col gap-1 text-gray-400 text-sm">
            {history.map((item, index) => (
              <div key={index} className="text-right">{item}</div>
            ))}
          </div>
        )}
      </div>
      <div className={cn(
        "text-gray-400 h-6 text-right transition-all",
        input && "text-white"
      )}>
        {input || "0"}
      </div>
      <div className="text-white text-4xl font-light overflow-x-auto whitespace-nowrap pb-1">
        {result || "0"}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
