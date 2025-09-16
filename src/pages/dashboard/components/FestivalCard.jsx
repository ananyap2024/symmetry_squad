import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FestivalCard = ({ festival, onExplore }) => {
  const getDaysUntil = (date) => {
    const today = new Date();
    const festivalDate = new Date(date);
    const diffTime = festivalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(festival?.date);

  return (
    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-4 border border-accent/20 shadow-warm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-accent" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground">{festival?.name}</h4>
            <p className="text-muted-foreground text-sm font-body">{festival?.region}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground font-caption">In {daysUntil} days</div>
          <div className="text-sm font-body text-foreground">{new Date(festival.date)?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
        </div>
      </div>
      <p className="text-sm text-foreground/80 font-body mb-4 line-clamp-2">{festival?.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {festival?.patterns?.slice(0, 3)?.map((pattern, index) => (
              <div key={index} className="w-6 h-6 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-caption">+{festival?.patterns?.length} patterns</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onExplore(festival?.id)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default FestivalCard;