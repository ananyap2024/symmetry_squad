import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DotGridCanvas = ({ onPatternChange }) => {
  const canvasRef = useRef(null);
  const [gridSize, setGridSize] = useState(15);
  const [isDrawing, setIsDrawing] = useState(false);
  const [connections, setConnections] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  const dotSpacing = 25;
  const dotRadius = 3;

  useEffect(() => {
    drawGrid();
  }, [gridSize]);

  const drawGrid = () => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const canvasSize = Math.min(canvas?.offsetWidth, canvas?.offsetHeight);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

    // Draw dots
    ctx.fillStyle = '#D2B48C';
    const centerX = canvas?.width / 2;
    const centerY = canvas?.height / 2;
    const startX = centerX - (gridSize - 1) * dotSpacing / 2;
    const startY = centerY - (gridSize - 1) * dotSpacing / 2;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = startX + col * dotSpacing;
        const y = startY + row * dotSpacing;
        
        ctx?.beginPath();
        ctx?.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx?.fill();
      }
    }

    // Draw connections
    if (connections?.length > 0) {
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      connections?.forEach(path => {
        if (path?.length > 1) {
          ctx?.beginPath();
          ctx?.moveTo(path?.[0]?.x, path?.[0]?.y);
          for (let i = 1; i < path?.length; i++) {
            ctx?.lineTo(path?.[i]?.x, path?.[i]?.y);
          }
          ctx?.stroke();
        }
      });
    }

    // Draw current path
    if (currentPath?.length > 1) {
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx?.beginPath();
      ctx?.moveTo(currentPath?.[0]?.x, currentPath?.[0]?.y);
      for (let i = 1; i < currentPath?.length; i++) {
        ctx?.lineTo(currentPath?.[i]?.x, currentPath?.[i]?.y);
      }
      ctx?.stroke();
    }
  };

  const getNearestDot = (mouseX, mouseY) => {
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = mouseX - rect?.left;
    const y = mouseY - rect?.top;

    const centerX = canvas?.width / 2;
    const centerY = canvas?.height / 2;
    const startX = centerX - (gridSize - 1) * dotSpacing / 2;
    const startY = centerY - (gridSize - 1) * dotSpacing / 2;

    let nearestDot = null;
    let minDistance = Infinity;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const dotX = startX + col * dotSpacing;
        const dotY = startY + row * dotSpacing;
        const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);

        if (distance < dotSpacing / 2 && distance < minDistance) {
          minDistance = distance;
          nearestDot = { x: dotX, y: dotY, row, col };
        }
      }
    }

    return nearestDot;
  };

  const handleMouseDown = (e) => {
    const dot = getNearestDot(e?.clientX, e?.clientY);
    if (dot) {
      setIsDrawing(true);
      setCurrentPath([dot]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const dot = getNearestDot(e?.clientX, e?.clientY);
    if (dot && !currentPath?.some(p => p?.row === dot?.row && p?.col === dot?.col)) {
      setCurrentPath(prev => [...prev, dot]);
      drawGrid();
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath?.length > 1) {
      setConnections(prev => [...prev, currentPath]);
      onPatternChange([...connections, currentPath]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setConnections([]);
    setCurrentPath([]);
    onPatternChange([]);
    drawGrid();
  };

  const undoLastPath = () => {
    if (connections?.length > 0) {
      const newConnections = connections?.slice(0, -1);
      setConnections(newConnections);
      onPatternChange(newConnections);
      drawGrid();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-foreground">Grid Size:</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e?.target?.value))}
            className="px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
          >
            <option value={9}>9x9</option>
            <option value={11}>11x11</option>
            <option value={13}>13x13</option>
            <option value={15}>15x15</option>
            <option value={17}>17x17</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={undoLastPath}
            disabled={connections?.length === 0}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Undo last path"
          >
            <Icon name="Undo" size={16} />
          </button>
          <button
            onClick={clearCanvas}
            disabled={connections?.length === 0}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Clear canvas"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>
      <div className="relative bg-background border border-border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-80 cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Click and drag to connect dots
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        <p>• Click on a dot and drag to create connections</p>
        <p>• Each path will be drawn in traditional Kolam style</p>
        <p>• Use undo to remove the last drawn path</p>
      </div>
    </div>
  );
};

export default DotGridCanvas;