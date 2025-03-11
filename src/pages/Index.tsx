
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-purple-800">Modern Calculator</h1>
      <Calculator />
      <p className="mt-8 text-sm text-gray-600 text-center max-w-xs">
        A beautiful calculator with basic arithmetic operations. 
        Use it for your everyday calculations!
      </p>
    </div>
  );
};

export default Index;
