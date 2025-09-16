import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DesignCard = ({ design, onEdit, onDuplicate, onShare, onExport, onDelete, onSelect, isSelected }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getComplexityColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Festival': return 'Calendar';
      case 'Daily': return 'Sun';
      case 'Special': return 'Star';
      case 'Traditional': return 'Crown';
      default: return 'Circle';
    }
  };

  return (
    <div 
      className={`group relative bg-card rounded-xl border-2 transition-all duration-300 hover:shadow-warm-lg ${
        isSelected ? 'border-primary shadow-warm-md' : 'border-border hover:border-primary/50'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={() => onSelect(design?.id)}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'bg-background border-border hover:border-primary'
          }`}
        >
          {isSelected && <Icon name="Check" size={14} />}
        </button>
      </div>
      {/* Design Preview */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={design?.thumbnail}
          alt={design?.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="Eye"
              onClick={() => onEdit(design)}
              className="bg-background/90 hover:bg-background"
            >
              View
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(design)}
              className="bg-background/90 hover:bg-background"
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-1">
          {design?.isShared && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
              Shared
            </div>
          )}
          {design?.isFeatured && (
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>Featured</span>
            </div>
          )}
        </div>
      </div>
      {/* Design Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
            {design?.name}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name={getCategoryIcon(design?.category)} size={16} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {design?.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{formatDate(design?.createdAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{design?.timeSpent}</span>
            </span>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${getComplexityColor(design?.complexity)}`}>
            {design?.complexity}
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{design?.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{design?.comments}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Share2" size={12} />
              <span>{design?.shares}</span>
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Download" size={12} />
            <span>{design?.downloads}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(design)}
            className="flex-1"
          >
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            onClick={() => onShare(design)}
          >
            <Icon name="Share2" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => onExport(design)}
          >
            <Icon name="Download" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(design)}
            className="text-error hover:text-error"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;