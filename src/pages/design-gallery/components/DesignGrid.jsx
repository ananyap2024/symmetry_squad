import React from 'react';
import DesignCard from './DesignCard';
import Icon from '../../../components/AppIcon';

const DesignGrid = ({ 
  designs, 
  viewMode, 
  selectedDesigns, 
  onDesignSelect, 
  onDesignEdit, 
  onDesignDuplicate, 
  onDesignShare, 
  onDesignExport, 
  onDesignDelete,
  loading 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-xl border border-border animate-pulse">
            <div className="aspect-square bg-muted rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded flex-1"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (designs?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Image" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          No designs found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't created any Kolam designs yet, or no designs match your current filters.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <button 
            onClick={() => window.location.href = '/pattern-creator'}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Create Your First Design
          </button>
          <button 
            onClick={() => window.location?.reload()}
            className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {designs?.map((design) => (
          <div key={design?.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-warm-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              {/* Selection Checkbox */}
              <button
                onClick={() => onDesignSelect(design?.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedDesigns?.includes(design?.id)
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-border hover:border-primary'
                }`}
              >
                {selectedDesigns?.includes(design?.id) && <Icon name="Check" size={14} />}
              </button>

              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={design?.thumbnail}
                  alt={design?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Design Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg">
                      {design?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {design?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{design?.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{design?.downloads}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{new Date(design.createdAt)?.toLocaleDateString('en-IN')}</span>
                    <span className="px-2 py-1 bg-muted rounded text-xs">{design?.complexity}</span>
                    <span className="px-2 py-1 bg-muted rounded text-xs">{design?.category}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDesignEdit(design)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onDesignDuplicate(design)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                      title="Duplicate"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                    <button
                      onClick={() => onDesignShare(design)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                      title="Share"
                    >
                      <Icon name="Share2" size={16} />
                    </button>
                    <button
                      onClick={() => onDesignExport(design)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                      title="Export"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                    <button
                      onClick={() => onDesignDelete(design)}
                      className="p-2 text-error hover:text-error hover:bg-error/10 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {designs?.map((design) => (
        <DesignCard
          key={design?.id}
          design={design}
          isSelected={selectedDesigns?.includes(design?.id)}
          onSelect={onDesignSelect}
          onEdit={onDesignEdit}
          onDuplicate={onDesignDuplicate}
          onShare={onDesignShare}
          onExport={onDesignExport}
          onDelete={onDesignDelete}
        />
      ))}
    </div>
  );
};

export default DesignGrid;