import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';


const ExportModal = ({ design, isOpen, onClose, onExport }) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    quality: 'high',
    size: 'original',
    includeWatermark: true,
    includeMetadata: true,
    backgroundColor: 'transparent',
    customWidth: '',
    customHeight: ''
  });

  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'png', label: 'PNG (Recommended)', description: 'Best for web and print' },
    { value: 'jpg', label: 'JPEG', description: 'Smaller file size' },
    { value: 'svg', label: 'SVG', description: 'Vector format, scalable' },
    { value: 'pdf', label: 'PDF', description: 'Print-ready document' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (Web)', description: '72 DPI' },
    { value: 'medium', label: 'Medium', description: '150 DPI' },
    { value: 'high', label: 'High (Print)', description: '300 DPI' },
    { value: 'ultra', label: 'Ultra High', description: '600 DPI' }
  ];

  const sizeOptions = [
    { value: 'original', label: 'Original Size', description: `${design?.dimensions?.width || 1024} × ${design?.dimensions?.height || 1024}px` },
    { value: 'small', label: 'Small', description: '512 × 512px' },
    { value: 'medium', label: 'Medium', description: '1024 × 1024px' },
    { value: 'large', label: 'Large', description: '2048 × 2048px' },
    { value: 'custom', label: 'Custom Size', description: 'Specify dimensions' }
  ];

  const backgroundOptions = [
    { value: 'transparent', label: 'Transparent' },
    { value: 'white', label: 'White' },
    { value: 'cream', label: 'Cream' },
    { value: 'black', label: 'Black' }
  ];

  const getEstimatedFileSize = () => {
    const baseSize = exportSettings?.format === 'svg' ? 50 : 
                    exportSettings?.quality === 'ultra' ? 8000 :
                    exportSettings?.quality === 'high' ? 4000 :
                    exportSettings?.quality === 'medium' ? 2000 : 1000;
    
    const sizeMultiplier = exportSettings?.size === 'large' ? 4 :
                          exportSettings?.size === 'medium' ? 2 :
                          exportSettings?.size === 'small' ? 0.5 : 1;
    
    const estimatedKB = Math.round(baseSize * sizeMultiplier);
    return estimatedKB > 1024 ? `${(estimatedKB / 1024)?.toFixed(1)} MB` : `${estimatedKB} KB`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      await onExport({
        design,
        settings: exportSettings
      });
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'png': return 'Image';
      case 'jpg': return 'Image';
      case 'svg': return 'Code';
      case 'pdf': return 'FileText';
      default: return 'Download';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-warm-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Export Design
              </h2>
              <p className="text-sm text-muted-foreground">
                Download "{design?.name}" in your preferred format
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Design Preview */}
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={design?.thumbnail}
                alt={design?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">
                {design?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Created on {new Date(design.createdAt)?.toLocaleDateString('en-IN')}
              </p>
              <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                <span>{design?.category}</span>
                <span>•</span>
                <span>{design?.complexity}</span>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Export Format
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formatOptions?.map((format) => (
                <button
                  key={format?.value}
                  onClick={() => setExportSettings(prev => ({ ...prev, format: format?.value }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    exportSettings?.format === format?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={getFormatIcon(format?.value)} 
                      size={20} 
                      className={exportSettings?.format === format?.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <div>
                      <div className="font-medium text-foreground">
                        {format?.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format?.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality and Size Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Quality"
                options={qualityOptions}
                value={exportSettings?.quality}
                onChange={(value) => setExportSettings(prev => ({ ...prev, quality: value }))}
              />
            </div>
            <div>
              <Select
                label="Size"
                options={sizeOptions}
                value={exportSettings?.size}
                onChange={(value) => setExportSettings(prev => ({ ...prev, size: value }))}
              />
            </div>
          </div>

          {/* Custom Size Inputs */}
          {exportSettings?.size === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Width (px)"
                type="number"
                placeholder="1024"
                value={exportSettings?.customWidth}
                onChange={(e) => setExportSettings(prev => ({ ...prev, customWidth: e?.target?.value }))}
              />
              <Input
                label="Height (px)"
                type="number"
                placeholder="1024"
                value={exportSettings?.customHeight}
                onChange={(e) => setExportSettings(prev => ({ ...prev, customHeight: e?.target?.value }))}
              />
            </div>
          )}

          {/* Background Color */}
          {exportSettings?.format !== 'svg' && (
            <div>
              <Select
                label="Background"
                options={backgroundOptions}
                value={exportSettings?.backgroundColor}
                onChange={(value) => setExportSettings(prev => ({ ...prev, backgroundColor: value }))}
              />
            </div>
          )}

          {/* Additional Options */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Additional Options
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Include watermark"
                description="Add a subtle Kolam Generator watermark"
                checked={exportSettings?.includeWatermark}
                onChange={(e) => setExportSettings(prev => ({
                  ...prev,
                  includeWatermark: e?.target?.checked
                }))}
              />
              <Checkbox
                label="Include metadata"
                description="Embed creation date, dimensions, and cultural context"
                checked={exportSettings?.includeMetadata}
                onChange={(e) => setExportSettings(prev => ({
                  ...prev,
                  includeMetadata: e?.target?.checked
                }))}
              />
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Format:</span>
                <span className="ml-2 font-medium text-foreground">
                  {formatOptions?.find(f => f?.value === exportSettings?.format)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Quality:</span>
                <span className="ml-2 font-medium text-foreground">
                  {qualityOptions?.find(q => q?.value === exportSettings?.quality)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-medium text-foreground">
                  {sizeOptions?.find(s => s?.value === exportSettings?.size)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Est. File Size:</span>
                <span className="ml-2 font-medium text-foreground">
                  {getEstimatedFileSize()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Download"
            loading={isExporting}
            onClick={handleExport}
          >
            {isExporting ? 'Exporting...' : 'Export Design'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;