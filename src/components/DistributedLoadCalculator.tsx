// DistributedLoadCalculator.tsx
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const DistributedLoadCalculator: React.FC = () => {
    const [beamLength, setBeamLength] = useState<number | ''>('');
    const [loadIntensity, setLoadIntensity] = useState<number | ''>('');
    const [startPoint, setStartPoint] = useState<number | ''>('');
    const [endPoint, setEndPoint] = useState<number | ''>('');
    const [plotData, setPlotData] = useState<{ x: number[], y: number[] } | null>(null);

    const calculateLoad = () => {
        if (typeof beamLength !== 'number' || typeof loadIntensity !== 'number' || typeof startPoint !== 'number' || typeof endPoint !== 'number' || startPoint >= endPoint || endPoint > beamLength) {
            alert("Please enter valid values.");
            return;
        }

        const x = Array.from({ length: beamLength * 10 }, (_, i) => i / 10);
        const y = x.map((xi) => (xi >= startPoint && xi <= endPoint) ? loadIntensity : 0);

        setPlotData({ x, y });
    };

    return (
        <div>
            <h3>Distributed Load Calculator</h3>
            <input type="number" placeholder="Beam Length (m)" value={beamLength} onChange={(e) => setBeamLength(Number(e.target.value))} />
            <input type="number" placeholder="Load Intensity (N/m)" value={loadIntensity} onChange={(e) => setLoadIntensity(Number(e.target.value))} />
            <input type="number" placeholder="Load Start Point (m)" value={startPoint} onChange={(e) => setStartPoint(Number(e.target.value))} />
            <input type="number" placeholder="Load End Point (m)" value={endPoint} onChange={(e) => setEndPoint(Number(e.target.value))} />
            <button onClick={calculateLoad}>Calculate Load Distribution</button>

            {plotData && (
                <Plot
                    data={[{
                        x: plotData.x,
                        y: plotData.y,
                        type: 'scatter',
                        fill: 'tozeroy',
                        mode: 'lines',
                        line: { color: 'blue' },
                    }]}
                    layout={{
                        title: 'Distributed Load Over Beam',
                        xaxis: { title: 'Position along Beam (m)' },
                        yaxis: { title: 'Load Intensity (N/m)' },
                    }}
                />
            )}
        </div>
    );
};

export default DistributedLoadCalculator;
