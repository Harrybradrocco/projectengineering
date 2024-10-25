import React from 'react';
import { Ruler, Settings } from 'lucide-react';
import { useUnits } from '../contexts/UnitContext';

interface BeamProperties {
  elasticModulus: number;
  momentOfInertia: number;
  area: number;
}

interface InputPanelProps {
  length: number;
  load: number;
  loadType: string;
  supportType: string;
  loadPosition: number;
  beamProperties: BeamProperties;
  setLength: (length: number) => void;
  setLoad: (load: number) => void;
  setLoadType: (type: string) => void;
  setSupportType: (type: string) => void;
  setLoadPosition: (position: number) => void;
  setBeamProperties: (props: BeamProperties) => void;
}

function InputPanel({
  length,
  load,
  loadType,
  supportType,
  loadPosition,
  beamProperties,
  setLength,
  setLoad,
  setLoadType,
  setSupportType,
  setLoadPosition,
  setBeamProperties,
}: InputPanelProps) {
  const { 
    convertLength, 
    convertLoad, 
    convertStress, 
    convertArea, 
    convertInertia,
    getLengthUnit,
    getLoadUnit,
    getStressUnit,
    getAreaUnit,
    getInertiaUnit
  } = useUnits();

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void,
    min: number
  ) => {
    const value = parseFloat(e.target.value);
    setter(Number.isFinite(value) && value >= min ? value : min);
  };

  const handlePropertyChange = (property: keyof BeamProperties, value: string) => {
    const numValue = parseFloat(value);
    if (Number.isFinite(numValue) && numValue > 0) {
      setBeamProperties({
        ...beamProperties,
        [property]: numValue
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Load Parameters
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Beam Length ({getLengthUnit()})
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={convertLength(length)}
              onChange={(e) => handleNumberChange(e, setLength, 0.1)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Load Magnitude ({getLoadUnit()})
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={convertLoad(load)}
              onChange={(e) => handleNumberChange(e, setLoad, 0.1)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Load Type</label>
            <select
              value={loadType}
              onChange={(e) => setLoadType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="point">Point Load</option>
              <option value="distributed">Distributed Load</option>
            </select>
          </div>

          {loadType === 'point' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Load Position ({getLengthUnit()} from left support)
              </label>
              <input
                type="number"
                min="0"
                max={convertLength(length)}
                step="0.1"
                value={convertLength(loadPosition)}
                onChange={(e) => handleNumberChange(e, setLoadPosition, 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Support Type</label>
            <select
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="simple">Simply Supported</option>
              <option value="fixed">Fixed Ends</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Beam Properties
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Elastic Modulus ({getStressUnit()})
            </label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={convertStress(beamProperties.elasticModulus)}
              onChange={(e) => handlePropertyChange('elasticModulus', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Moment of Inertia ({getInertiaUnit()})
            </label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={convertInertia(beamProperties.momentOfInertia)}
              onChange={(e) => handlePropertyChange('momentOfInertia', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cross-sectional Area ({getAreaUnit()})
            </label>
            <input
              type="number"
              min="100"
              step="100"
              value={convertArea(beamProperties.area)}
              onChange={(e) => handlePropertyChange('area', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPanel;