
import { useState } from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import { X, Divide, Minus, Plus, Percent, Delete, Equal } from 'lucide-react';

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [storedOperation, setStoredOperation] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<number | null>(null);

  const handleNumberInput = (value: string) => {
    if (waitingForOperand) {
      setInput(value);
      setWaitingForOperand(false);
    } else {
      setInput(input === '0' ? value : input + value);
    }
  };

  const handleDecimalPoint = () => {
    if (waitingForOperand) {
      setInput('0.');
      setWaitingForOperand(false);
    } else if (input.indexOf('.') === -1) {
      setInput(input + '.');
    }
  };

  const handleOperator = (operator: string) => {
    const inputValue = parseFloat(input);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (storedOperation) {
      const newResult = performCalculation(storedValue, inputValue, storedOperation);
      setStoredValue(newResult);
      setResult(String(newResult));
      addToHistory(`${storedValue} ${storedOperation} ${inputValue} = ${newResult}`);
    }

    setWaitingForOperand(true);
    setStoredOperation(operator);
  };

  const performCalculation = (
    firstOperand: number,
    secondOperand: number,
    operation: string
  ): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (storedOperation && storedValue !== null) {
      const inputValue = parseFloat(input);
      const newResult = performCalculation(storedValue, inputValue, storedOperation);
      
      addToHistory(`${storedValue} ${storedOperation} ${inputValue} = ${newResult}`);
      
      setInput(String(newResult));
      setResult(String(newResult));
      setStoredValue(null);
      setStoredOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setStoredValue(null);
    setStoredOperation(null);
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (!waitingForOperand) {
      setInput(input.length > 1 ? input.slice(0, -1) : '');
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(input);
    const percentValue = value / 100;
    setInput(String(percentValue));
  };

  const addToHistory = (calculation: string) => {
    setHistory(prevHistory => [...prevHistory, calculation].slice(-5));
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl bg-calculator-bg">
      <CalculatorDisplay input={input} result={result} history={history} />
      
      <div className="p-4 grid grid-cols-4 gap-4">
        {/* First row */}
        <CalculatorButton value="C" onClick={handleClear} variant="function">C</CalculatorButton>
        <CalculatorButton value="%" onClick={handlePercentage} variant="function">
          <Percent size={20} />
        </CalculatorButton>
        <CalculatorButton value="delete" onClick={handleDelete} variant="function">
          <Delete size={20} />
        </CalculatorButton>
        <CalculatorButton value="÷" onClick={handleOperator} variant="operator">
          <Divide size={24} />
        </CalculatorButton>
        
        {/* Second row */}
        <CalculatorButton value="7" onClick={handleNumberInput}>7</CalculatorButton>
        <CalculatorButton value="8" onClick={handleNumberInput}>8</CalculatorButton>
        <CalculatorButton value="9" onClick={handleNumberInput}>9</CalculatorButton>
        <CalculatorButton value="×" onClick={handleOperator} variant="operator">
          <X size={20} />
        </CalculatorButton>
        
        {/* Third row */}
        <CalculatorButton value="4" onClick={handleNumberInput}>4</CalculatorButton>
        <CalculatorButton value="5" onClick={handleNumberInput}>5</CalculatorButton>
        <CalculatorButton value="6" onClick={handleNumberInput}>6</CalculatorButton>
        <CalculatorButton value="-" onClick={handleOperator} variant="operator">
          <Minus size={20} />
        </CalculatorButton>
        
        {/* Fourth row */}
        <CalculatorButton value="1" onClick={handleNumberInput}>1</CalculatorButton>
        <CalculatorButton value="2" onClick={handleNumberInput}>2</CalculatorButton>
        <CalculatorButton value="3" onClick={handleNumberInput}>3</CalculatorButton>
        <CalculatorButton value="+" onClick={handleOperator} variant="operator">
          <Plus size={20} />
        </CalculatorButton>
        
        {/* Fifth row */}
        <CalculatorButton value="0" onClick={handleNumberInput} doubleWidth>0</CalculatorButton>
        <CalculatorButton value="." onClick={handleDecimalPoint}>.</CalculatorButton>
        <CalculatorButton value="=" onClick={handleEquals} variant="equals">
          <Equal size={20} />
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
