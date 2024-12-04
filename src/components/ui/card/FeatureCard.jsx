import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react';

const FeatureCard = ({
  title,
  icon,
  description,
  badge,
  children,
  variant = 'default',
  onClick,
  step
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const baseClasses = "p-4 rounded-lg shadow-lg transition-all border border-navy-600";
  const variantClasses = {
    default: "bg-navy-800 text-white hover:bg-navy-700",
    primary: "bg-gradient-to-r from-navy-900 to-navy-800 text-white hover:from-navy-800 hover:to-navy-700"
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) onClick();
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleClear = () => {
    // Clear functionality can be handled by parent component
  };

  const handleReset = () => {
    setIsExpanded(false);
    // Reset functionality can be handled by parent component
  };

  return (
    <div className="space-y-2">
      {/* Card Header */}
      <div
        className={`${baseClasses} ${variantClasses[variant]} cursor-pointer backdrop-blur-sm`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-amber-400">{title}</h3>
              {badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-amber-400 text-navy-900 font-medium">
                  {badge}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm mt-1 text-gray-300">{description}</p>
            )}
          </div>
          <div className="text-amber-400">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-navy-900 rounded-lg shadow-xl p-6 animate-slideDown border border-amber-400/20">
          {/* Control Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="px-3 py-1 text-sm text-gray-300 hover:text-amber-400 flex items-center gap-1"
            >
              <RotateCcw size={14} />
              Clear
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="px-3 py-1 text-sm text-gray-300 hover:text-amber-400 flex items-center gap-1"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="px-3 py-1 text-sm text-gray-300 hover:text-amber-400 flex items-center gap-1"
            >
              <X size={14} />
              Close
            </button>
          </div>

          {/* Card Content */}
          {children}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;