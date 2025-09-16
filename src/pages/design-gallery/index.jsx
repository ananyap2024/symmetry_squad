import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import FilterToolbar from './components/FilterToolbar';
import DesignGrid from './components/DesignGrid';
import ShareModal from './components/ShareModal';
import ExportModal from './components/ExportModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    complexity: 'all',
    inputMethod: 'all',
    status: 'all'
  });

  // Modal states
  const [shareModal, setShareModal] = useState({ isOpen: false, design: null });
  const [exportModal, setExportModal] = useState({ isOpen: false, design: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, design: null, designs: null });

  // Mock data for designs
  const mockDesigns = [
    {
      id: 1,
      name: "Diwali Lotus Kolam",
      description: `Traditional lotus pattern created for Diwali celebrations./nFeatures intricate petal designs with sacred geometry principles.\nPerfect for main entrance decoration during the festival of lights.`,
      thumbnail: "src/diwali.jpg",
      category: "Festival",
      complexity: "Advanced",
      inputMethod: "grid",
      createdAt: "2024-09-10T08:30:00Z",
      timeSpent: "2h 15m",
      likes: 156,
      comments: 23,
      shares: 45,
      downloads: 89,
      isShared: true,
      isFeatured: true,
      dimensions: { width: 1024, height: 1024 }
    },
    {
      id: 2,
      name: "Morning Rangoli",
      description: `Simple daily kolam pattern for morning rituals./nEasy to draw with basic geometric shapes.\nBrings positive energy to start the day.`,
      thumbnail: "src/morning.jpg",
      category: "Daily",
      complexity: "Beginner",
      inputMethod: "text",
      createdAt: "2024-09-12T06:00:00Z",
      timeSpent: "45m",
      likes: 89,
      comments: 12,
      shares: 18,
      downloads: 34,
      isShared: true,
      isFeatured: false,
      dimensions: { width: 512, height: 512 }
    },
    {
      id: 3,
      name: "Peacock Feather Design",
      description: `Elegant peacock feather motif with traditional curves.\nInspired by South Indian temple art.\nSymbolizes beauty and grace in Indian culture.`,
      thumbnail: "src/peacock.jpg",
      category: "Traditional",
      complexity: "Intermediate",
      inputMethod: "image",
      createdAt: "2024-09-08T14:20:00Z",
      timeSpent: "1h 30m",
      likes: 234,
      comments: 45,
      shares: 67,
      downloads: 123,
      isShared: true,
      isFeatured: true,
      dimensions: { width: 1024, height: 1024 }
    },
    {
      id: 4,
      name: "Geometric Mandala",
      description: `Complex mandala pattern with mathematical precision.\nCombines traditional and modern design elements.\nRequires advanced drawing skills.`,
      thumbnail: "src/geomandala.jpg",
      category: "Special",
      complexity: "Advanced",
      inputMethod: "grid",
      createdAt: "2024-09-05T16:45:00Z",
      timeSpent: "3h 20m",
      likes: 345,
      comments: 78,
      shares: 92,
      downloads: 167,
      isShared: false,
      isFeatured: false,
      dimensions: { width: 2048, height: 2048 }
    },
    {
      id: 5,
      name: "Pongal Celebration",
      description: `Special kolam design for Pongal harvest festival.\nIncorporates rice and sugarcane motifs.\nCelebrates abundance and prosperity.`,
      thumbnail: "src/pongal2.jpg",
      category: "Festival",
      complexity: "Intermediate",
      inputMethod: "text",
      createdAt: "2024-09-01T10:15:00Z",
      timeSpent: "1h 45m",
      likes: 198,
      comments: 34,
      shares: 56,
      downloads: 78,
      isShared: true,
      isFeatured: false,
      dimensions: { width: 1024, height: 1024 }
    },
    {
      id: 6,
      name: "Simple Dot Pattern",
      description: `Basic dot-connecting pattern for beginners.\nGreat for learning fundamental kolam techniques.\nBuilds foundation for complex designs.`,
      thumbnail: "src/dot.jpg",
      category: "Daily",
      complexity: "Beginner",
      inputMethod: "grid",
      createdAt: "2024-08-28T07:30:00Z",
      timeSpent: "30m",
      likes: 67,
      comments: 8,
      shares: 12,
      downloads: 23,
      isShared: false,
      isFeatured: false,
      dimensions: { width: 512, height: 512 }
    }
  ];

  // Initialize designs
  useEffect(() => {
    const loadDesigns = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDesigns(mockDesigns);
      setLoading(false);
    };

    loadDesigns();
  }, []);

  // Filter and sort designs
  const processedDesigns = useMemo(() => {
    let filtered = designs?.filter(design => {
      const matchesSearch = !filters?.search || 
        design?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        design?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesCategory = filters?.category === 'all' || design?.category === filters?.category;
      const matchesComplexity = filters?.complexity === 'all' || design?.complexity === filters?.complexity;
      const matchesInputMethod = filters?.inputMethod === 'all' || design?.inputMethod === filters?.inputMethod;
      
      const matchesStatus = filters?.status === 'all' ||
        (filters?.status === 'shared' && design?.isShared) ||
        (filters?.status === 'private' && !design?.isShared) ||
        (filters?.status === 'featured' && design?.isFeatured);

      return matchesSearch && matchesCategory && matchesComplexity && matchesInputMethod && matchesStatus;
    });

    // Sort designs
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'popular':
          return (b?.likes + b?.downloads) - (a?.likes + a?.downloads);
        case 'likes':
          return b?.likes - a?.likes;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'complexity':
          const complexityOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return complexityOrder?.[a?.complexity] - complexityOrder?.[b?.complexity];
        default:
          return 0;
      }
    });

    return filtered;
  }, [designs, filters, sortBy]);

  useEffect(() => {
    setFilteredDesigns(processedDesigns);
  }, [processedDesigns]);

  // Design selection handlers
  const handleDesignSelect = (designId) => {
    setSelectedDesigns(prev => 
      prev?.includes(designId) 
        ? prev?.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDesigns?.length === filteredDesigns?.length) {
      setSelectedDesigns([]);
    } else {
      setSelectedDesigns(filteredDesigns?.map(design => design?.id));
    }
  };

  // Design action handlers
  const handleDesignEdit = (design) => {
    // Navigate to pattern creator with design data
    window.location.href = `/pattern-creator?edit=${design?.id}`;
  };

  const handleDesignDuplicate = (design) => {
    const duplicatedDesign = {
      ...design,
      id: Date.now(),
      name: `${design?.name} (Copy)`,
      createdAt: new Date()?.toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      downloads: 0,
      isShared: false,
      isFeatured: false
    };
    
    setDesigns(prev => [duplicatedDesign, ...prev]);
  };

  const handleDesignShare = (design) => {
    setShareModal({ isOpen: true, design });
  };

  const handleDesignExport = (design) => {
    setExportModal({ isOpen: true, design });
  };

  const handleDesignDelete = (design) => {
    setDeleteModal({ isOpen: true, design, designs: null });
  };

  // Bulk action handlers
  const handleBulkAction = (action) => {
    const selectedDesignObjects = designs?.filter(design => selectedDesigns?.includes(design?.id));
    
    switch (action) {
      case 'export':
        // Handle bulk export
        console.log('Bulk export:', selectedDesignObjects);
        break;
      case 'share':
        // Handle bulk share
        console.log('Bulk share:', selectedDesignObjects);
        break;
      case 'delete':
        setDeleteModal({ isOpen: true, design: null, designs: selectedDesignObjects });
        break;
      case 'feature':
        // Handle bulk feature
        setDesigns(prev => prev?.map(design => 
          selectedDesigns?.includes(design?.id) 
            ? { ...design, isFeatured: !design?.isFeatured }
            : design
        ));
        setSelectedDesigns([]);
        break;
      default:
        break;
    }
  };

  // Modal handlers
  const handleShareConfirm = ({ design, platforms, settings }) => {
    console.log('Sharing design:', design?.name, 'on platforms:', platforms, 'with settings:', settings);
    
    // Update design share count
    setDesigns(prev => prev?.map(d => 
      d?.id === design?.id 
        ? { ...d, shares: d?.shares + platforms?.length, isShared: true }
        : d
    ));
    
    setShareModal({ isOpen: false, design: null });
  };

  const handleExportConfirm = async ({ design, settings }) => {
    console.log('Exporting design:', design?.name, 'with settings:', settings);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update design download count
    setDesigns(prev => prev?.map(d => 
      d?.id === design?.id 
        ? { ...d, downloads: d?.downloads + 1 }
        : d
    ));
    
    setExportModal({ isOpen: false, design: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal?.designs) {
      // Bulk delete
      const idsToDelete = deleteModal?.designs?.map(d => d?.id);
      setDesigns(prev => prev?.filter(design => !idsToDelete?.includes(design?.id)));
      setSelectedDesigns([]);
    } else if (deleteModal?.design) {
      // Single delete
      setDesigns(prev => prev?.filter(design => design?.id !== deleteModal?.design?.id));
    }
    
    setDeleteModal({ isOpen: false, design: null, designs: null });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      complexity: 'all',
      inputMethod: 'all',
      status: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Design Gallery
              </h1>
              <p className="text-muted-foreground">
                Manage and showcase your beautiful Kolam creations
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {selectedDesigns?.length > 0 && (
                <Button
                  variant="outline"
                  iconName="Square"
                  onClick={handleSelectAll}
                >
                  {selectedDesigns?.length === filteredDesigns?.length ? 'Deselect All' : 'Select All'}
                </Button>
              )}
              
              <Button
                variant="default"
                iconName="Plus"
                onClick={() => window.location.href = '/pattern-creator'}
              >
                Create New Design
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {designs?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Designs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {designs?.reduce((sum, design) => sum + design?.likes, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Download" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {designs?.reduce((sum, design) => sum + design?.downloads, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {designs?.filter(design => design?.isFeatured)?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Featured</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            filters={filters}
            onFilterChange={setFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedCount={selectedDesigns?.length}
            onBulkAction={handleBulkAction}
            onClearFilters={clearFilters}
          />

          {/* Design Grid */}
          <DesignGrid
            designs={filteredDesigns}
            viewMode={viewMode}
            selectedDesigns={selectedDesigns}
            onDesignSelect={handleDesignSelect}
            onDesignEdit={handleDesignEdit}
            onDesignDuplicate={handleDesignDuplicate}
            onDesignShare={handleDesignShare}
            onDesignExport={handleDesignExport}
            onDesignDelete={handleDesignDelete}
            loading={loading}
          />
        </div>
      </main>
      {/* Modals */}
      <ShareModal
        design={shareModal?.design}
        isOpen={shareModal?.isOpen}
        onClose={() => setShareModal({ isOpen: false, design: null })}
        onShare={handleShareConfirm}
      />
      <ExportModal
        design={exportModal?.design}
        isOpen={exportModal?.isOpen}
        onClose={() => setExportModal({ isOpen: false, design: null })}
        onExport={handleExportConfirm}
      />
      <DeleteConfirmModal
        design={deleteModal?.design}
        designs={deleteModal?.designs}
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, design: null, designs: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default DesignGallery;