import React from 'react';

interface BeamDiagramProps {
  length: number;
  load: number;
  loadType: string;
  supportType: string;
  loadPosition: number;
}

function BeamDiagram({ length, load, loadType, supportType, loadPosition }: BeamDiagramProps) {
  const validLength = Math.max(0.1, Number.isFinite(length) ? length : 5);
  const validLoad = Math.max(0.1, Number.isFinite(load) ? load : 10);
  const validPosition = Math.min(Math.max(0, loadPosition), length);
  const scale = 400 / validLength;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Beam Diagram</h2>
      
      <div className="relative h-64 w-full">
        <svg className="w-full h-full" viewBox="0 0 500 200">
          {/* Beam */}
          <line
            x1="50"
            y1="100"
            x2={50 + validLength * scale}
            y2="100"
            stroke="black"
            strokeWidth="4"
          />

          {/* Supports */}
          {supportType === 'simple' ? (
            <>
              <polygon
                points={`40,120 60,120 50,100`}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <polygon
                points={`${40 + validLength * scale},120 ${60 + validLength * scale},120 ${50 + validLength * scale},100`}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
            </>
          ) : (
            <>
              <line x1="50" y1="80" x2="50" y2="120" stroke="black" strokeWidth="2" />
              <line 
                x1={50 + validLength * scale} 
                y1="80" 
                x2={50 + validLength * scale} 
                y2="120" 
                stroke="black" 
                strokeWidth="2" 
              />
            </>
          )}

          {/* Load */}
          {loadType === 'point' ? (
            <>
              <line
                x1={50 + validPosition * scale}
                y1="40"
                x2={50 + validPosition * scale}
                y2="100"
                stroke="red"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <text
                x={50 + validPosition * scale}
                y="30"
                textAnchor="middle"
                fill="red"
                className="text-sm"
              >
                {validLoad} kN
              </text>
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1={50 + (i + 1) * (validLength * scale) / 6}
                  y1="40"
                  x2={50 + (i + 1) * (validLength * scale) / 6}
                  y2="100"
                  stroke="red"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              ))}
              <text
                x={50 + (validLength * scale) / 2}
                y="30"
                textAnchor="middle"
                fill="red"
                className="text-sm"
              >
                {validLoad} kN/m
              </text>
            </>
          )}

          {/* Position markers */}
          <text
            x="50"
            y="140"
            textAnchor="middle"
            fill="gray"
            className="text-xs"
          >
            0 m
          </text>
          <text
            x={50 + validLength * scale}
            y="140"
            textAnchor="middle"
            fill="gray"
            className="text-xs"
          >
            {validLength} m
          </text>

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="red" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default BeamDiagram;