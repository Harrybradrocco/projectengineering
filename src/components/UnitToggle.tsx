import React from 'react';
import { useUnits } from '../contexts/UnitContext';

function UnitToggle() {
  const { unitSystem, toggleUnits } = useUnits();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Units:</span>
      <button
        onClick={toggleUnits}
        className={`
          relative inline-flex h-6 w-20 items-center rounded-full
          ${unitSystem === 'metric' ? 'bg-blue-600' : 'bg-gray-200'}
        `}
      >
        <span className="sr-only">Toggle unit system</span>
        <span
          className={`
            inline-block h-4 w-16 transform rounded-full bg-white transition
            ${unitSystem === 'metric' ? 'translate-x-1' : 'translate-x-3'}
          `}
        >
          <span className="flex h-full items-center justify-center text-xs font-medium">
            {unitSystem === 'metric' ? 'Metric' : 'Imperial'}
          </span>
        </span>
      </button>
    </div>
  );
}

export default UnitToggle;