import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShareModal = ({ design, isOpen, onClose, onShare }) => {
  const [shareSettings, setShareSettings] = useState({
    platforms: {
      facebook: false,
      twitter: false,
      instagram: false,
      pinterest: false,
      whatsapp: false
    },
    includeDescription: true,
    includeTags: true,
    allowDownload: true,
    customMessage: ''
  });

  const [shareLink, setShareLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'text-pink-600' },
    { id: 'pinterest', name: 'Pinterest', icon: 'Image', color: 'text-red-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600' }
  ];

  const defaultTags = [
    '#Kolam', '#TraditionalArt', '#IndianCulture', '#RangoliDesign', 
    '#SacredGeometry', '#MorningRitual', '#FestivalArt', '#HandDrawn'
  ];

  const handlePlatformToggle = (platformId) => {
    setShareSettings(prev => ({
      ...prev,
      platforms: {
        ...prev?.platforms,
        [platformId]: !prev?.platforms?.[platformId]
      }
    }));
  };

  const generateShareLink = () => {
    const baseUrl = window.location?.origin;
    const link = `${baseUrl}/shared-design/${design?.id}`;
    setShareLink(link);
    return link;
  };

  const copyToClipboard = async () => {
    const link = shareLink || generateShareLink();
    try {
      await navigator.clipboard?.writeText(link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = () => {
    const selectedPlatforms = Object.keys(shareSettings?.platforms)?.filter(platform => shareSettings?.platforms?.[platform]);
    
    if (selectedPlatforms?.length === 0) {
      alert('Please select at least one platform to share on.');
      return;
    }

    onShare({
      design,
      platforms: selectedPlatforms,
      settings: shareSettings
    });
  };

  const getShareMessage = () => {
    let message = shareSettings?.customMessage || `Check out my beautiful Kolam design "${design?.name}"!`;
    
    if (shareSettings?.includeDescription && design?.description) {
      message += `\n\n${design?.description}`;
    }
    
    if (shareSettings?.includeTags) {
      message += `\n\n${defaultTags?.join(' ')}`;
    }
    
    return message;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-warm-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Share2" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Share Design
              </h2>
              <p className="text-sm text-muted-foreground">
                Share "{design?.name}" with the community
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
              <p className="text-sm text-muted-foreground line-clamp-2">
                {design?.description}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                <span>{design?.category}</span>
                <span>•</span>
                <span>{design?.complexity}</span>
                <span>•</span>
                <span>{design?.likes} likes</span>
              </div>
            </div>
          </div>

          {/* Social Platforms */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Select Platforms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.id}
                  onClick={() => handlePlatformToggle(platform?.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    shareSettings?.platforms?.[platform?.id]
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon 
                      name={platform?.icon} 
                      size={24} 
                      className={shareSettings?.platforms?.[platform?.id] ? 'text-primary' : platform?.color}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {platform?.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Share Settings */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Share Settings
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Include design description"
                checked={shareSettings?.includeDescription}
                onChange={(e) => setShareSettings(prev => ({
                  ...prev,
                  includeDescription: e?.target?.checked
                }))}
              />
              <Checkbox
                label="Include cultural hashtags"
                checked={shareSettings?.includeTags}
                onChange={(e) => setShareSettings(prev => ({
                  ...prev,
                  includeTags: e?.target?.checked
                }))}
              />
              <Checkbox
                label="Allow others to download this design"
                checked={shareSettings?.allowDownload}
                onChange={(e) => setShareSettings(prev => ({
                  ...prev,
                  allowDownload: e?.target?.checked
                }))}
              />
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <Input
              label="Custom Message (Optional)"
              type="text"
              placeholder="Add a personal message to your share..."
              value={shareSettings?.customMessage}
              onChange={(e) => setShareSettings(prev => ({
                ...prev,
                customMessage: e?.target?.value
              }))}
              description="This will be included with your shared design"
            />
          </div>

          {/* Share Link */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Direct Link
            </h3>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={shareLink || generateShareLink()}
                readOnly
                className="flex-1"
              />
              <Button
                variant={linkCopied ? 'success' : 'outline'}
                iconName={linkCopied ? 'Check' : 'Copy'}
                onClick={copyToClipboard}
              >
                {linkCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Preview Message */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Preview Message
            </h3>
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm text-foreground whitespace-pre-line">
                {getShareMessage()}
              </p>
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
            iconName="Share2"
            onClick={handleShare}
          >
            Share Design
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;