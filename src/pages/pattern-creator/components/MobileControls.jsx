import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MobileControls = ({ 
  activePanel, 
  onPanelChange, 
  patternData, 
  onGenerate, 
  onExport 
}) => {
  const [showControls, setShowControls] = useState(false);

  const panels = [
    { id: 'input', label: 'Input', icon: 'Edit3' },
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'customize', label: 'Style', icon: 'Palette' },
    { id: 'generate', label: 'Generate', icon: 'Sparkles' }
  ];

  const quickActions = [
    { 
      id: 'generate', 
      label: 'Generate', 
      icon: 'Sparkles', 
      action: onGenerate,
      disabled: !patternData,
      variant: 'primary'
    },
    { 
      id: 'export', 
      label: 'Export', 
      icon: 'Download', 
      action: () => onExport('png'),
      disabled: !patternData,
      variant: 'outline'
    },
    { 
      id: 'save', 
      label: 'Save', 
      icon: 'Save', 
      action: () => console.log('Save'),
      disabled: !patternData,
      variant: 'ghost'
    }
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          {panels?.map((panel) => (
            <button
              key={panel?.id}
              onClick={() => onPanelChange(panel?.id)}
              className={`
                flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors
                ${activePanel === panel?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={panel?.icon} size={20} />
              <span className="text-xs font-medium">{panel?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-warm-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <Icon name={showControls ? 'X' : 'Menu'} size={24} />
        </button>

        {/* Quick Actions Menu */}
        {showControls && (
          <div className="absolute bottom-16 right-0 space-y-2">
            {quickActions?.map((action, index) => (
              <button
                key={action?.id}
                onClick={() => {
                  action?.action();
                  setShowControls(false);
                }}
                disabled={action?.disabled}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-full shadow-warm-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  ${action?.variant === 'primary' ?'bg-primary text-primary-foreground' 
                    : action?.variant === 'outline' ?'bg-card text-foreground border border-border' :'bg-muted text-muted-foreground'
                  }
                `}
                style={{
                  transform: `translateY(-${index * 60}px)`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <Icon name={action?.icon} size={20} />
                <span className="text-sm font-medium">{action?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Swipe Indicator */}
      {activePanel && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
          <div className="bg-card border border-border rounded-full px-4 py-2 shadow-warm">
            <div className="flex items-center space-x-2">
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground capitalize">{activePanel}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
      {/* Touch Gestures Help */}
      {activePanel === 'preview' && (
        <div className="fixed top-24 right-4 z-30 md:hidden">
          <div className="bg-card border border-border rounded-lg p-3 shadow-warm max-w-48">
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Move" size={12} />
                <span>Pinch to zoom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Hand" size={12} />
                <span>Drag to pan</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pattern Status Indicator */}
      {patternData && (
        <div className="fixed top-20 right-4 z-30 md:hidden">
          <div className="bg-success text-success-foreground rounded-full px-3 py-1 shadow-warm">
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} />
              <span className="text-xs font-medium">Ready</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileControls;