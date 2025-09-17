import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const PatternPreview = ({ patternData, inputMethod }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setLastPanPoint({ x: e?.clientX, y: e?.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning && zoomLevel > 1) {
      const deltaX = e?.clientX - lastPanPoint?.x;
      const deltaY = e?.clientY - lastPanPoint?.y;
      
      setPanOffset(prev => ({
        x: prev?.x + deltaX,
        y: prev?.y + deltaY
      }));
      
      setLastPanPoint({ x: e?.clientX, y: e?.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const renderPreviewContent = () => {
    if (!patternData) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="Eye" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Pattern Preview</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your Kolam pattern will appear here as you create it using any of the input methods.
          </p>
        </div>
      );
    }

    // Mock pattern visualization based on input method
    if (inputMethod === 'grid' && patternData?.length > 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className="border border-border rounded-lg bg-background"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset?.x}px, ${panOffset?.y}px)`
            }}
          >
            {/* Grid dots */}
            {Array.from({ length: 15 }, (_, row) =>
              Array.from({ length: 15 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={20 + col * 20}
                  cy={20 + row * 20}
                  r="2"
                  fill="#D2B48C"
                />
              ))
            )}
            
            {/* Pattern paths */}
            {patternData?.map((path, pathIndex) => (
              <path
                key={pathIndex}
                d={`M ${path?.[0]?.x || 20} ${path?.[0]?.y || 20} ${path?.slice(1)?.map(p => `L ${p?.x} ${p?.y}`)?.join(' ')}`}
                stroke="#D2691E"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>
      );
    }

    if (inputMethod === 'image' && patternData) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <img
              src={patternData?.url}
              alt="Pattern preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset?.x}px, ${panOffset?.y}px)`
              }}
            />
            <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-50"></div>
          </div>
        </div>
      );
    }

    if (inputMethod === 'text' && patternData) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="border border-border rounded-lg bg-background"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset?.x}px, ${panOffset?.y}px)`
            }}
          >
            {/* Generated pattern based on text description */}
            <defs>
              <pattern id="kolamPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#D2B48C" />
              </pattern>
            </defs>
            
            <rect width="320" height="320" fill="url(src\preview.png)" opacity="0.3" />
            
            {/* Lotus-like pattern */}
            <g transform="translate(160,160)">
              {Array.from({ length: 8 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 45})`}>
                  <path
                    d="M 0,0 Q 30,-10 60,0 Q 30,10 0,0"
                    stroke="#D2691E"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M 0,0 Q 20,-15 40,-5 Q 20,5 0,0"
                    stroke="#DC143C"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r="8" stroke="#d21e1eff" strokeWidth="2" fill="none" />
            </g>
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={0} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Generated Pattern</h3>
          {patternData && (
            <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Live
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom out"
          >
            <Icon name="ZoomOut" size={16} />
          </button>
          
          <span className="text-xs text-muted-foreground min-w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom in"
          >
            <Icon name="ZoomIn" size={16} />
          </button>
          
          <button
            onClick={handleResetView}
            className="p-2 rounded hover:bg-muted transition-colors"
            title="Reset view"
          >
            <Icon name="RotateCcw" size={16} />
          </button>
        </div>
      </div>
      {/* Preview Area */}
      <div
        ref={previewRef}
        className={`flex-1 bg-background overflow-hidden ${
          zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
        } ${isPanning ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderPreviewContent()}
      </div>
      {/* Preview Info */}
      {patternData && (
        <div className="p-4 border-t border-border bg-card">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Input Method:</span>
              <span className="ml-2 text-foreground capitalize">{inputMethod}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className="ml-2 text-success">Ready</span>
            </div>
            {inputMethod === 'grid' && (
              <div>
                <span className="text-muted-foreground">Paths:</span>
                <span className="ml-2 text-foreground">{patternData?.length}</span>
              </div>
            )}
            {inputMethod === 'image' && (
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 text-foreground">
                  {(patternData?.size / 1024 / 1024)?.toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPreview;