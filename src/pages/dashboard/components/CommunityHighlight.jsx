import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityHighlight = ({ highlight, onView }) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-warm hover:shadow-warm-md transition-all duration-300">
      <div className="flex items-start space-x-3 mb-3">
        <Image 
          src={highlight?.author?.avatar} 
          alt={highlight?.author?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h5 className="font-heading font-medium text-foreground text-sm">{highlight?.author?.name}</h5>
            <div className="flex items-center space-x-1">
              {highlight?.author?.verified && (
                <Icon name="CheckCircle" size={12} className="text-primary" />
              )}
              <span className="text-xs text-muted-foreground font-caption">{highlight?.author?.location}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-caption">{highlight?.timeAgo}</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg mb-3">
        <Image 
          src={highlight?.design?.image} 
          alt={highlight?.design?.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-caption">{highlight?.design?.category}</span>
        </div>
      </div>
      <div className="space-y-2">
        <h6 className="font-heading font-medium text-foreground text-sm">{highlight?.design?.name}</h6>
        <p className="text-muted-foreground text-xs font-body line-clamp-2">{highlight?.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{highlight?.stats?.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{highlight?.stats?.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share" size={12} />
              <span>{highlight?.stats?.shares}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            iconName="ExternalLink"
            onClick={() => onView(highlight?.id)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityHighlight;