import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartCard = ({ title, description, icon, route, gradient, pattern }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 ${gradient} shadow-warm-md hover:shadow-warm-lg transition-all duration-300 group`}>
      {/* Traditional Pattern Overlay */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
          <circle cx="70" cy="30" r="2" fill="currentColor" />
          <circle cx="30" cy="70" r="2" fill="currentColor" />
          <circle cx="70" cy="70" r="2" fill="currentColor" />
          <path d="M30 30 L70 30 L70 70 L30 70 Z" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Icon name={icon} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-white mb-1">{title}</h3>
            <p className="text-white/80 text-sm font-body">{description}</p>
          </div>
        </div>
        
        <Link to={route}>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Start Creating
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickStartCard;