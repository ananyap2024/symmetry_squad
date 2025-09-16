import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDesignCard = ({ design, onEdit, onShare, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-warm hover:shadow-warm-md transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Image 
          src={design?.thumbnail} 
          alt={design?.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-caption">{design?.complexity}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-1">{design?.name}</h4>
          <p className="text-muted-foreground text-sm font-body">{design?.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
          <span>Created: {formatDate(design?.createdAt)}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={12} />
            <span>{design?.likes}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(design?.id)}
          >
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            iconName="Share"
            onClick={() => onShare(design?.id)}
          />
          <Button 
            variant="ghost" 
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(design?.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentDesignCard;