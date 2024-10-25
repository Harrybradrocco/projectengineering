import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import BeamDiagram from './components/BeamDiagram';
import ResultsPanel from './components/ResultsPanel';
import InputPanel from './components/InputPanel';
import UnitToggle from './components/UnitToggle';

interface BeamProperties {
  elasticModulus: number;
  momentOfInertia: number;
  area: number;
}

function App() {
  const [length, setLength] = useState<number>(5);
  const [load, setLoad] = useState<number>(10);
  const [loadType, setLoadType] = useState('point');
  const [supportType, setSupportType] = useState('simple');
  const [loadPosition, setLoadPosition] = useState<number>(2.5);
  const [beamProperties, setBeamProperties] = useState<BeamProperties>({
    elasticModulus: 200000,
    momentOfInertia: 8.5e6,
    area: 2850,
  });

  const calculateResults = () => {
    const validLength = Math.max(0.1, Number.isFinite(length) ? length : 5);
    const validLoad = Math.max(0.1, Number.isFinite(load) ? load : 10);
    const validPosition = Math.min(Math.max(0, loadPosition), length);
    const { elasticModulus, momentOfInertia, area } = beamProperties;

    let maxMoment, maxShear, maxDeflection;

    if (loadType === 'point') {
      const a = validPosition;
      const b = validLength - a;
      
      maxMoment = (validLoad * a * b) / validLength;
      maxShear = validLoad * Math.max(a, b) / validLength;
      maxDeflection = (validLoad * a * b * (validLength * 1000)) / 
        (3 * elasticModulus * momentOfInertia) * 
        Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    } else {
      maxMoment = (validLoad * Math.pow(validLength, 2)) / 8;
      maxShear = (validLoad * validLength) / 2;
      maxDeflection = (5 * validLoad * Math.pow(validLength * 1000, 4)) / 
        (384 * elasticModulus * momentOfInertia);
    }

    return { 
      maxMoment, 
      maxShear, 
      maxDeflection,
      properties: beamProperties 
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Point Load Calculator</h1>
            </div>
            <UnitToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <InputPanel
              length={length}
              load={load}
              loadType={loadType}
              supportType={supportType}
              loadPosition={loadPosition}
              beamProperties={beamProperties}
              setLength={setLength}
              setLoad={setLoad}
              setLoadType={setLoadType}
              setSupportType={setSupportType}
              setLoadPosition={setLoadPosition}
              setBeamProperties={setBeamProperties}
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <BeamDiagram
                length={length}
                load={load}
                loadType={loadType}
                supportType={supportType}
                loadPosition={loadPosition}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <ResultsPanel results={results} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;