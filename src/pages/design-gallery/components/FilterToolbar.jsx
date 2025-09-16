import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  selectedCount,
  onBulkAction,
  onClearFilters
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'complexity', label: 'Complexity' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Festival', label: 'Festival' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Special', label: 'Special Occasions' },
    { value: 'Traditional', label: 'Traditional' }
  ];

  const complexityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const inputMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'grid', label: 'Dot Grid' },
    { value: 'image', label: 'Image Upload' },
    { value: 'text', label: 'Text Description' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Designs' },
    { value: 'shared', label: 'Shared Only' },
    { value: 'private', label: 'Private Only' },
    { value: 'featured', label: 'Featured' }
  ];

  const bulkActions = [
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'share', label: 'Share Selected', icon: 'Share2' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' },
    { value: 'feature', label: 'Mark as Featured', icon: 'Star' }
  ];

  const hasActiveFilters = filters?.category !== 'all' || 
                          filters?.complexity !== 'all' || 
                          filters?.inputMethod !== 'all' || 
                          filters?.status !== 'all';

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-warm">
      {/* Top Row - Search and View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search designs by name or description..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e?.target?.value })}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <Icon name="List" size={18} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by..."
            className="min-w-[140px]"
          />
        </div>
      </div>
      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-4">
        <Select
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange({ ...filters, category: value })}
          placeholder="Category"
        />
        
        <Select
          options={complexityOptions}
          value={filters?.complexity}
          onChange={(value) => onFilterChange({ ...filters, complexity: value })}
          placeholder="Complexity"
        />
        
        <Select
          options={inputMethodOptions}
          value={filters?.inputMethod}
          onChange={(value) => onFilterChange({ ...filters, inputMethod: value })}
          placeholder="Input Method"
        />
        
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange({ ...filters, status: value })}
          placeholder="Status"
        />

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
              className="flex-1"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Bulk Actions Row */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} design{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            {bulkActions?.map((action) => (
              <Button
                key={action?.value}
                variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                size="sm"
                iconName={action?.icon}
                onClick={() => onBulkAction(action?.value)}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;