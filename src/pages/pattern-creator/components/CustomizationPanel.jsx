import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CustomizationPanel = ({ onCustomizationChange }) => {
  const [activeSection, setActiveSection] = useState('colors');
  const [customization, setCustomization] = useState({
    colors: {
      primary: '#D2691E',
      secondary: '#DC143C',
      background: '#FFF8DC'
    },
    lineThickness: 2,
    symmetry: 'radial',
    complexity: 'medium'
  });

  const colorPalettes = [
    {
      name: 'Traditional',
      colors: ['#D2691E', '#DC143C', '#8B4513', '#228B22']
    },
    {
      name: 'Festival',
      colors: ['#FF8C00', '#FF1493', '#9370DB', '#32CD32']
    },
    {
      name: 'Elegant',
      colors: ['#2F1B14', '#8B7355', '#D2B48C', '#F5F5DC']
    },
    {
      name: 'Modern',
      colors: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B']
    }
  ];

  const symmetryOptions = [
    { value: 'radial', label: 'Radial', icon: 'RotateCw' },
    { value: 'bilateral', label: 'Bilateral', icon: 'Reflect' },
    { value: 'rotational', label: 'Rotational', icon: 'RefreshCw' },
    { value: 'none', label: 'Asymmetric', icon: 'Shuffle' }
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple', description: 'Basic patterns with few elements' },
    { value: 'medium', label: 'Medium', description: 'Balanced complexity and detail' },
    { value: 'complex', label: 'Complex', description: 'Intricate patterns with many details' },
    { value: 'expert', label: 'Expert', description: 'Highly detailed traditional designs' }
  ];

  const handleColorChange = (colorType, color) => {
    const newCustomization = {
      ...customization,
      colors: {
        ...customization?.colors,
        [colorType]: color
      }
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handlePaletteSelect = (palette) => {
    const newCustomization = {
      ...customization,
      colors: {
        primary: palette?.colors?.[0],
        secondary: palette?.colors?.[1],
        background: palette?.colors?.[3] || '#FFF8DC'
      }
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleLineThicknessChange = (thickness) => {
    const newCustomization = {
      ...customization,
      lineThickness: thickness
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleSymmetryChange = (symmetry) => {
    const newCustomization = {
      ...customization,
      symmetry
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleComplexityChange = (complexity) => {
    const newCustomization = {
      ...customization,
      complexity
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const sections = [
    { id: 'colors', label: 'Colors', icon: 'Palette' },
    { id: 'style', label: 'Style', icon: 'Brush' },
    { id: 'structure', label: 'Structure', icon: 'Grid3X3' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Section Tabs */}
      <div className="flex border-b border-border">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-2 text-sm font-medium transition-colors
              ${activeSection === section?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={section?.icon} size={16} />
            <span className="hidden sm:inline">{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Section Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeSection === 'colors' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Color Palettes</h4>
              <div className="grid grid-cols-2 gap-2">
                {colorPalettes?.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaletteSelect(palette)}
                    className="p-2 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex space-x-1 mb-1">
                      {palette?.colors?.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">{palette?.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Custom Colors</h4>
              <div className="space-y-3">
                {Object.entries(customization?.colors)?.map(([colorType, color]) => (
                  <div key={colorType} className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground capitalize">
                      {colorType}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded border border-border cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'color';
                          input.value = color;
                          input.onchange = (e) => handleColorChange(colorType, e?.target?.value);
                          input?.click();
                        }}
                      />
                      <span className="text-xs font-mono text-muted-foreground">
                        {color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'style' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Line Thickness</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={customization?.lineThickness}
                  onChange={(e) => handleLineThicknessChange(parseInt(e?.target?.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Thin</span>
                  <span>{customization?.lineThickness}px</span>
                  <span>Thick</span>
                </div>
                <div className="h-8 bg-background border border-border rounded flex items-center justify-center">
                  <div
                    className="bg-primary rounded"
                    style={{
                      width: '60px',
                      height: `${customization?.lineThickness}px`
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Pattern Style</h4>
              <div className="space-y-2">
                {['flowing', 'geometric', 'traditional', 'modern']?.map((style) => (
                  <label key={style} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="patternStyle"
                      value={style}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground capitalize">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'structure' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Symmetry Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {symmetryOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSymmetryChange(option?.value)}
                    className={`
                      p-3 border rounded-lg transition-colors text-left
                      ${customization?.symmetry === option?.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={option?.icon} size={16} />
                      <span className="text-sm font-medium">{option?.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Complexity Level</h4>
              <div className="space-y-2">
                {complexityLevels?.map((level) => (
                  <button
                    key={level?.value}
                    onClick={() => handleComplexityChange(level?.value)}
                    className={`
                      w-full p-3 border rounded-lg transition-colors text-left
                      ${customization?.complexity === level?.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="font-medium text-sm mb-1">{level?.label}</div>
                    <div className="text-xs text-muted-foreground">{level?.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Apply Button */}
      <div className="p-4 border-t border-border">
        <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Apply Customization
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;