import React, { createContext, useContext, useState } from 'react';

type UnitSystem = 'metric' | 'imperial';

interface UnitContextType {
  unitSystem: UnitSystem;
  toggleUnits: () => void;
  convertLength: (value: number) => number;
  convertLoad: (value: number) => number;
  convertStress: (value: number) => number;
  convertArea: (value: number) => number;
  convertInertia: (value: number) => number;
  getLengthUnit: () => string;
  getLoadUnit: () => string;
  getStressUnit: () => string;
  getAreaUnit: () => string;
  getInertiaUnit: () => string;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const toggleUnits = () => {
    setUnitSystem(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const convertLength = (value: number) => {
    return unitSystem === 'metric' ? value : value * 3.28084; // m to ft
  };

  const convertLoad = (value: number) => {
    return unitSystem === 'metric' ? value : value * 0.22481; // kN to kip
  };

  const convertStress = (value: number) => {
    return unitSystem === 'metric' ? value : value * 0.145038; // MPa to ksi
  };

  const convertArea = (value: number) => {
    return unitSystem === 'metric' ? value : value * 0.00155; // mm² to in²
  };

  const convertInertia = (value: number) => {
    return unitSystem === 'metric' ? value : value * 0.0024; // mm⁴ to in⁴
  };

  const getLengthUnit = () => unitSystem === 'metric' ? 'm' : 'ft';
  const getLoadUnit = () => unitSystem === 'metric' ? 'kN' : 'kip';
  const getStressUnit = () => unitSystem === 'metric' ? 'MPa' : 'ksi';
  const getAreaUnit = () => unitSystem === 'metric' ? 'mm²' : 'in²';
  const getInertiaUnit = () => unitSystem === 'metric' ? 'mm⁴' : 'in⁴';

  return (
    <UnitContext.Provider value={{
      unitSystem,
      toggleUnits,
      convertLength,
      convertLoad,
      convertStress,
      convertArea,
      convertInertia,
      getLengthUnit,
      getLoadUnit,
      getStressUnit,
      getAreaUnit,
      getInertiaUnit,
    }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnits() {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnits must be used within a UnitProvider');
  }
  return context;
}