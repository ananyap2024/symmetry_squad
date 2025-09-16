import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      tooltip: 'Central hub for inspiration and quick access'
    },
    {
      label: 'Create',
      path: '/pattern-creator',
      icon: 'PenTool',
      tooltip: 'Pattern creation workspace'
    },
    {
      label: 'Gallery',
      path: '/design-gallery',
      icon: 'Image',
      tooltip: 'Your design portfolio'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-warm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-warm">
    <img src="src\logo.png" alt="Kolametry Logo" className="w-10 h-10 object-contain" />
  </div>
  <div className="hidden sm:block">
    <h1 className="text-xl font-heading font-semibold text-foreground">
      Kolametry
    </h1>
    <p className="text-xs text-muted-foreground font-caption">
      Where Tradition Meets Technology
    </p>
  </div>
</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                relative px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-300
                flex items-center space-x-2 group
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'text-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`transition-transform duration-300 ${
                  isActivePath(item?.path) ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              <span>{item?.label}</span>
              {isActivePath(item?.path) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
          aria-label="Toggle navigation menu"
        >
          <Icon 
            name={isMobileMenuOpen ? 'X' : 'Menu'} 
            size={24} 
            className="text-foreground"
          />
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-warm-lg animate-fade-in">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium text-sm transition-all duration-300
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
                <div className="flex-1">
                  <span className="block">{item?.label}</span>
                  <span className="text-xs opacity-75 font-caption">{item?.tooltip}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;