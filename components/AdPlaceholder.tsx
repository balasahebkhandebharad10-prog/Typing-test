
import React from 'react';

interface AdPlaceholderProps {
  width: string;
  height: string;
  text: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ width, height, text }) => {
  return (
    <div
      className={`flex items-center justify-center bg-slate-200/80 dark:bg-slate-700/80 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg ${width} ${height}`}
    >
      <div className="text-center text-slate-500 dark:text-slate-400">
        <p className="font-semibold">{text}</p>
        {/* AdSense Ad Goes Here */}
        {/* Adsterra Ad Goes Here */}
      </div>
    </div>
  );
};

export default AdPlaceholder;
