import React from 'react';
import Icon from '../../../components/AppIcon';

const InputMethodTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'grid',
      label: 'Dot Grid',
      icon: 'Grid3X3',
      description: 'Interactive canvas'
    },
    {
      id: 'image',
      label: 'Image Upload',
      icon: 'Upload',
      description: 'Drag & drop files'
    },
    {
      id: 'text',
      label: 'Text Description',
      icon: 'Type',
      description: 'Natural language'
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground mb-3">Input Method</h3>
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`
            w-full p-3 rounded-lg border transition-all duration-300 text-left
            ${activeTab === tab?.id
              ? 'bg-primary text-primary-foreground border-primary shadow-warm'
              : 'bg-card text-card-foreground border-border hover:bg-muted'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <Icon 
              name={tab?.icon} 
              size={20} 
              className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{tab?.label}</div>
              <div className={`text-xs ${
                activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {tab?.description}
              </div>
            </div>
            {activeTab === tab?.id && (
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default InputMethodTabs;