import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import InputMethodTabs from './components/InputMethodTabs';
import DotGridCanvas from './components/DotGridCanvas';
import ImageUploadArea from './components/ImageUploadArea';
import TextDescriptionInput from './components/TextDescriptionInput';
import PatternPreview from './components/PatternPreview';
import CustomizationPanel from './components/CustomizationPanel';
import AIGenerationControls from './components/AIGenerationControls';
import ExportToolbar from './components/ExportToolbar';
import MobileControls from './components/MobileControls';
import Icon from '../../components/AppIcon';

const PatternCreator = () => {
  const [activeInputMethod, setActiveInputMethod] = useState('grid');
  const [patternData, setPatternData] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [activeMobilePanel, setActiveMobilePanel] = useState('input');
  const [generatedPattern, setGeneratedPattern] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputMethodChange = (method) => {
    setActiveInputMethod(method);
    setPatternData(null);
  };

  const handlePatternDataChange = (data) => {
    setPatternData(data);
  };

  const handleCustomizationChange = (customizationData) => {
    setCustomization(customizationData);
  };

  const handleGenerate = (generationData) => {
    setGeneratedPattern(generationData);
    console.log('Generated pattern:', generationData);
  };

  const handleExport = (exportData) => {
    console.log('Exporting pattern:', exportData);
    // Simulate file download
    const link = document.createElement('a');
    link.download = exportData?.filename;
    link.href = '#';
    link?.click();
  };

  const handleSave = (saveData) => {
    console.log('Saving pattern:', saveData);
    localStorage.setItem(`kolam-pattern-${Date.now()}`, JSON.stringify(saveData));
    alert('Pattern saved successfully!');
  };

  const handleShare = (shareData) => {
    console.log('Sharing pattern:', shareData);
    if (navigator.share) {
      navigator.share({
        title: 'My Kolam Pattern',
        text: 'Check out this beautiful Kolam pattern I created!',
        url: shareData?.shareUrl
      });
    } else {
      navigator.clipboard?.writeText(shareData?.shareUrl);
      alert('Share link copied to clipboard!');
    }
  };

  const renderInputMethod = () => {
    switch (activeInputMethod) {
      case 'grid':
        return <DotGridCanvas onPatternChange={handlePatternDataChange} />;
      case 'image':
        return <ImageUploadArea onImageUpload={handlePatternDataChange} />;
      case 'text':
        return <TextDescriptionInput onDescriptionChange={handlePatternDataChange} />;
      default:
        return null;
    }
  };

  const renderMobilePanel = () => {
    switch (activeMobilePanel) {
      case 'input':
        return (
          <div className="space-y-6">
            <InputMethodTabs
              activeTab={activeInputMethod}
              onTabChange={handleInputMethodChange}
            />
            {renderInputMethod()}
          </div>
        );
      case 'preview':
        return (
          <PatternPreview
            patternData={generatedPattern || patternData}
            inputMethod={activeInputMethod}
            showThumbnail={!!generatedPattern}
          />
        );
      case 'customize':
        return (
          <CustomizationPanel
            onCustomizationChange={handleCustomizationChange}
          />
        );
      case 'generate':
        return (
          <AIGenerationControls
            patternData={patternData}
            inputMethod={activeInputMethod}
            onGenerate={handleGenerate}
          />
        );
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16 pb-20">
          <div className="p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pattern Creator
              </h1>
              <p className="text-muted-foreground">
                Create unique Kolam designs with AI assistance
              </p>
            </div>

            <div className="min-h-96">
              {renderMobilePanel()}
            </div>
          </div>
        </main>

        <MobileControls
          activePanel={activeMobilePanel}
          onPanelChange={setActiveMobilePanel}
          patternData={patternData}
          onGenerate={handleGenerate}
          onExport={handleExport}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Panel - Input Methods */}
          <div className="w-80 border-r border-border bg-card overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground mb-2">
                  Pattern Creator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create unique Kolam designs through multiple input methods
                </p>
              </div>

              <div className="space-y-6">
                <InputMethodTabs
                  activeTab={activeInputMethod}
                  onTabChange={handleInputMethodChange}
                />
                {renderInputMethod()}
              </div>
            </div>
          </div>

          {/* Central Workspace - Pattern Preview */}
          <div className="flex-1 bg-background">
            <PatternPreview
              patternData={patternData}
              inputMethod={activeInputMethod}
            />
          </div>

          {/* Right Panel - Customization & AI Controls */}
          <div className="w-80 border-l border-border bg-card overflow-y-auto">
            <div className="h-full flex flex-col">
              <div className="flex-1 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Customization
                    </h3>
                    <CustomizationPanel
                      onCustomizationChange={handleCustomizationChange}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-6">
                <AIGenerationControls
                  patternData={patternData}
                  inputMethod={activeInputMethod}
                  onGenerate={handleGenerate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export Toolbar */}
        <ExportToolbar
          patternData={patternData}
          onExport={handleExport}
          onSave={handleSave}
          onShare={handleShare}
        />

        {/* Generation Success Modal */}
        {generatedPattern && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 shadow-warm-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Pattern Generated Successfully!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your unique Kolam pattern has been created with {generatedPattern?.result?.culturalScore}% cultural authenticity.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setGeneratedPattern(null)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Continue Editing
                  </button>
                  <button
                    onClick={() => {
                      handleExport({ format: 'png', patternData, filename: `${generatedPattern?.result?.name}.png` });
                      setGeneratedPattern(null);
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Export Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatternCreator;