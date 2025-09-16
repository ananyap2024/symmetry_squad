import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const InspirationCard = ({ inspiration }) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-warm hover:shadow-warm-md transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <Image 
          src={inspiration?.image} 
          alt={inspiration?.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 text-white">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} fill="currentColor" />
            <span className="text-xs font-caption">Traditional</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h5 className="font-heading font-medium text-foreground text-sm">{inspiration?.title}</h5>
        <p className="text-muted-foreground text-xs font-body line-clamp-2">{inspiration?.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
          <span>{inspiration?.region}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={10} />
            <span>{inspiration?.festival}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;