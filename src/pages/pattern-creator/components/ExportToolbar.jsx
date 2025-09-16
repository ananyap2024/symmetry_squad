import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportToolbar = ({ patternData, onExport, onSave, onShare }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportFormats = [
    { value: 'png', label: 'PNG', description: 'High quality image', icon: 'Image' },
    { value: 'svg', label: 'SVG', description: 'Scalable vector', icon: 'Vector' },
    { value: 'pdf', label: 'PDF', description: 'Print optimized', icon: 'FileText' }
  ];

  const handleExport = async (format) => {
    if (!patternData) {
      alert('No pattern to export. Please create a pattern first.');
      return;
    }

    setIsExporting(true);
    setShowExportOptions(false);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      onExport({
        format,
        patternData,
        timestamp: new Date()?.toISOString(),
        filename: `kolam-pattern-${Date.now()}.${format}`
      });
    }, 2000);
  };

  const handleSave = () => {
    if (!patternData) {
      alert('No pattern to save. Please create a pattern first.');
      return;
    }

    onSave({
      patternData,
      timestamp: new Date()?.toISOString(),
      name: `Kolam Pattern ${new Date()?.toLocaleString()}`
    });
  };

  const handleShare = () => {
    if (!patternData) {
      alert('No pattern to share. Please create a pattern first.');
      return;
    }

    onShare({
      patternData,
      shareUrl: `${window.location?.origin}/shared-pattern/${Date.now()}`,
      timestamp: new Date()?.toISOString()
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-full shadow-warm-lg px-2 py-2">
        <div className="flex items-center space-x-2">
          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!patternData}
            variant="ghost"
            size="sm"
            iconName="Save"
            className="rounded-full"
            title="Save pattern"
          >
            <span className="hidden sm:inline ml-2">Save</span>
          </Button>

          {/* Export Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={!patternData || isExporting}
              loading={isExporting}
              variant="default"
              size="sm"
              iconName="Download"
              className="rounded-full"
              title="Export pattern"
            >
              <span className="hidden sm:inline ml-2">Export</span>
            </Button>

            {showExportOptions && (
              <div className="absolute bottom-full mb-2 left-0 bg-popover border border-border rounded-lg shadow-warm-lg min-w-48 z-50">
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2">Export Format</div>
                  {exportFormats?.map((format) => (
                    <button
                      key={format?.value}
                      onClick={() => handleExport(format?.value)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded hover:bg-muted transition-colors"
                    >
                      <Icon name={format?.icon} size={16} className="text-muted-foreground" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-foreground">{format?.label}</div>
                        <div className="text-xs text-muted-foreground">{format?.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            disabled={!patternData}
            variant="outline"
            size="sm"
            iconName="Share2"
            className="rounded-full"
            title="Share pattern"
          >
            <span className="hidden sm:inline ml-2">Share</span>
          </Button>

          {/* Print Button */}
          <Button
            onClick={() => window.print()}
            disabled={!patternData}
            variant="ghost"
            size="sm"
            iconName="Printer"
            className="rounded-full"
            title="Print pattern"
          >
            <span className="hidden sm:inline ml-2">Print</span>
          </Button>
        </div>
      </div>
      {/* Export Progress */}
      {isExporting && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-warm-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
            <span className="text-sm">Exporting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportToolbar;