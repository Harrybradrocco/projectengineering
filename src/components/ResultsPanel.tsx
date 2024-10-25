import React from 'react';
import { TrendingUp, ArrowDownCircle, ArrowLeftRight, Settings } from 'lucide-react';
import { useUnits } from '../contexts/UnitContext';

interface ResultsPanelProps {
  results: {
    maxMoment: number;
    maxShear: number;
    maxDeflection: number;
    properties: {
      elasticModulus: number;
      momentOfInertia: number;
      area: number;
    };
  };
}

function ResultsPanel({ results }: ResultsPanelProps) {
  const { 
    convertLoad, 
    convertStress, 
    convertArea, 
    convertInertia,
    getLoadUnit,
    getStressUnit,
    getAreaUnit,
    getInertiaUnit
  } = useUnits();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Analysis Results
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-medium text-blue-900">Maximum Moment</h3>
            </div>
            <span className="text-lg font-semibold text-blue-900">
              {convertLoad(results.maxMoment).toFixed(2)} {getLoadUnit()}⋅m
            </span>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-green-600" />
              <h3 className="text-sm font-medium text-green-900">Maximum Shear</h3>
            </div>
            <span className="text-lg font-semibold text-green-900">
              {convertLoad(results.maxShear).toFixed(2)} {getLoadUnit()}
            </span>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-medium text-purple-900">Maximum Deflection</h3>
            </div>
            <span className="text-lg font-semibold text-purple-900">
              {results.maxDeflection.toFixed(2)} mm
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">Beam Properties</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Elastic Modulus:</span>
              <span className="font-medium">
                {convertStress(results.properties.elasticModulus).toLocaleString()} {getStressUnit()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Moment of Inertia:</span>
              <span className="font-medium">
                {convertInertia(results.properties.momentOfInertia).toLocaleString()} {getInertiaUnit()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cross-sectional Area:</span>
              <span className="font-medium">
                {convertArea(results.properties.area).toLocaleString()} {getAreaUnit()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;