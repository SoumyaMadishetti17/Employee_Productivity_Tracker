
import { BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      onClick={() => navigate('/')} // Navigate to home on click
    >
      <BarChart2 className="w-6 h-6 text-blue-400" />
      <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        ProductivityPro
      </span>
    </div>
  );
}
