import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIGenerationControls = ({ patternData, inputMethod, onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    uniqueness: 75,
    culturalAuthenticity: 90,
    similarityAnalysis: true,
    stepByStepGuide: true
  });

  const handleGenerate = async () => {
    if (!patternData) {
      alert('Please provide input using one of the methods above');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate({
        inputMethod,
        patternData,
        settings: generationSettings,
        result: {
          id: Date.now(),
          name: `Generated Kolam ${new Date()?.toLocaleTimeString()}`,
          complexity: generationSettings?.uniqueness > 70 ? 'complex' : 'medium',
          culturalScore: generationSettings?.culturalAuthenticity,
          elements: ['lotus', 'geometric lines', 'radial symmetry'],
          generatedAt: new Date()?.toISOString()
        }
      });
    }, 3000);
  };

  const handleSettingChange = (setting, value) => {
    setGenerationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Generation Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="Sparkles" size={16} className="mr-2 text-primary" />
            AI Generation
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs ${
            patternData 
              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {patternData ? 'Ready' : 'Waiting for input'}
          </div>
        </div>
        
        {patternData && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Input method: <span className="text-foreground capitalize">{inputMethod}</span></p>
            <p>Data received: <span className="text-success">✓</span></p>
            <p>Ready to generate unique Kolam pattern</p>
          </div>
        )}
      </div>
      {/* Generation Settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Generation Settings</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">Uniqueness Level</label>
              <span className="text-xs text-foreground">{generationSettings?.uniqueness}%</span>
            </div>
            <input
              type="range"
              min="25"
              max="100"
              value={generationSettings?.uniqueness}
              onChange={(e) => handleSettingChange('uniqueness', parseInt(e?.target?.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Similar</span>
              <span>Unique</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">Cultural Authenticity</label>
              <span className="text-xs text-foreground">{generationSettings?.culturalAuthenticity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={generationSettings?.culturalAuthenticity}
              onChange={(e) => handleSettingChange('culturalAuthenticity', parseInt(e?.target?.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Modern</span>
              <span>Traditional</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generationSettings?.similarityAnalysis}
                onChange={(e) => handleSettingChange('similarityAnalysis', e?.target?.checked)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Enable similarity analysis</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generationSettings?.stepByStepGuide}
                onChange={(e) => handleSettingChange('stepByStepGuide', e?.target?.checked)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Generate step-by-step guide</span>
            </label>
          </div>
        </div>
      </div>
      {/* Generation Progress */}
      {isGenerating && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm font-medium text-primary">Generating Pattern...</span>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Analyzing input pattern</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Applying cultural authenticity rules</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Generating unique variations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span>Creating step-by-step guide</span>
            </div>
          </div>
        </div>
      )}
      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!patternData || isGenerating}
        loading={isGenerating}
        iconName="Sparkles"
        iconPosition="left"
        variant="default"
        fullWidth
        className="py-3"
      >
        {isGenerating ? 'Generating Pattern...' : 'Generate Unique Kolam'}
      </Button>
      {/* AI Features Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Brain" size={16} className="mr-2 text-accent" />
          AI Features
        </h5>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Pattern similarity analysis and matching</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Cultural authenticity validation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Unique design generation algorithms</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Traditional pattern library integration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Step-by-step drawing guide creation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerationControls;