import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickStartCard from './components/QuickStartCard';
import RecentDesignCard from './components/RecentDesignCard';
import InspirationCard from './components/InspirationCard';
import StatsCard from './components/StatsCard';
import FestivalCard from './components/FestivalCard';
import CommunityHighlight from './components/CommunityHighlight';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for quick start options
  const quickStartOptions = [
    {
      title: "Interactive Dot Grid",
      description: "Create patterns using traditional dot matrix",
      icon: "Grid3X3",
      route: "/pattern-creator",
      gradient: "bg-gradient-to-br from-primary to-primary/80"
    },
    {
      title: "Image Upload",
      description: "Transform your images into Kolam designs",
      icon: "Upload",
      route: "/pattern-creator",
      gradient: "bg-gradient-to-br from-accent to-accent/80"
    },
    {
      title: "Text Description",
      description: "Describe your vision in natural language",
      icon: "MessageSquare",
      route: "/pattern-creator",
      gradient: "bg-gradient-to-br from-secondary to-secondary/80"
    }
  ];

  // Mock user statistics
  const userStats = [
    {
      title: "Designs Created",
      value: "24",
      icon: "Palette",
      trend: "up",
      trendValue: "+3 this week",
      color: "primary"
    },
    {
      title: "Community Votes",
      value: "156",
      icon: "Heart",
      trend: "up",
      trendValue: "+12 today",
      color: "accent"
    },
    {
      title: "Cultural Badges",
      value: "8",
      icon: "Award",
      trend: "up",
      trendValue: "+1 new",
      color: "success"
    },
    {
      title: "Patterns Shared",
      value: "12",
      icon: "Share",
      trend: "neutral",
      trendValue: "2 pending",
      color: "warning"
    }
  ];

  // Mock recent designs
  const recentDesigns = [
    {
      id: 1,
      name: "Lotus Mandala",
      description: "Traditional lotus pattern with 8-fold symmetry",
      thumbnail: "src/lotusmandala2.jpg",
      createdAt: "2025-09-12",
      complexity: "Medium",
      likes: 23
    },
    {
      id: 2,
      name: "Peacock Feather",
      description: "Intricate peacock motif for Diwali celebrations",
      thumbnail: "src/peacock2.jpg",
      createdAt: "2025-09-10",
      complexity: "Advanced",
      likes: 45
    },
    {
      id: 3,
      name: "Simple Dots",
      description: "Beginner-friendly dot pattern",
      thumbnail: "src/simpledot.jpg",
      createdAt: "2025-09-08",
      complexity: "Easy",
      likes: 12
    },
    {
      id: 4,
      name: "Festival Rangoli",
      description: "Colorful design for Pongal celebration",
      thumbnail: "src/festival.jpg",
      createdAt: "2025-09-05",
      complexity: "Medium",
      likes: 34
    }
  ];

  // Mock inspiration patterns
  const inspirationPatterns = [
    {
      id: 1,
      title: "Tamil Nadu Classic",
      description: "Traditional morning kolam from Chennai region with geometric precision",
      image: "src/tamilnadu.jpg",
      region: "Tamil Nadu",
      festival: "Daily"
    },
    {
      id: 2,
      title: "Kerala Pookalam",
      description: "Floral rangoli design for Onam celebrations",
      image: "src/kerala.jpg",
      region: "Kerala",
      festival: "Onam"
    },
    {
      id: 3,
      title: "Andhra Muggulu",
      description: "Intricate dot patterns from Andhra Pradesh",
      image: "src/andhra.jpg",
      region: "Andhra Pradesh",
      festival: "Sankranti"
    }
  ];

  // Mock upcoming festivals
  const upcomingFestivals = [
    {
      id: 1,
      name: "Diwali",
      date: "2025-10-24",
      region: "Pan-India",
      description: "Festival of lights requiring elaborate rangoli designs with diyas and geometric patterns",
      patterns: ["Lotus", "Diya", "Swastik", "Peacock", "Geometric"]
    },
    {
      id: 2,
      name: "Pongal",
      date: "2025-01-14",
      region: "Tamil Nadu",
      description: "Harvest festival celebrating prosperity with traditional kolam designs",
      patterns: ["Rice", "Sugarcane", "Sun", "Pot"]
    }
  ];

  // Mock community highlights
  const communityHighlights = [
    {
      id: 1,
      author: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        location: "Chennai",
        verified: true
      },
      design: {
        name: "Morning Glory",
        image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?w=300&h=200&fit=crop",
        category: "Traditional"
      },
      description: "Created this beautiful morning kolam inspired by my grandmother's teachings. The symmetry represents harmony in daily life.",
      timeAgo: "2 hours ago",
      stats: {
        likes: 89,
        comments: 12,
        shares: 5
      }
    },
    {
      id: 2,
      author: {
        name: "Rajesh Kumar",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        location: "Bangalore",
        verified: false
      },
      design: {
        name: "Tech Fusion",
        image: "https://images.pixabay.com/photo/2019/12/14/08/36/mandala-4694852_1280.jpg?w=300&h=200&fit=crop",
        category: "Modern"
      },
      description: "Blending traditional kolam with modern geometric patterns. Perfect for contemporary homes.",
      timeAgo: "5 hours ago",
      stats: {
        likes: 67,
        comments: 8,
        shares: 3
      }
    }
  ];

  const handleEditDesign = (designId) => {
    navigate(`/pattern-creator?edit=${designId}`);
  };

  const handleShareDesign = (designId) => {
    // Mock share functionality
    console.log(`Sharing design ${designId}`);
  };

  const handleDeleteDesign = (designId) => {
    // Mock delete functionality
    console.log(`Deleting design ${designId}`);
  };

  const handleExploreFestival = (festivalId) => {
    navigate(`/design-gallery?festival=${festivalId}`);
  };

  const handleViewHighlight = (highlightId) => {
    navigate(`/design-gallery?highlight=${highlightId}`);
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {getGreeting()}, Artist! 🎨
                </h1>
                <p className="text-muted-foreground font-body">
                  Ready to create beautiful Kolam designs? Choose your preferred method below.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-body text-foreground">
                    {currentTime?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">
                    {currentTime?.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {quickStartOptions?.map((option, index) => (
                <QuickStartCard
                  key={index}
                  title={option?.title}
                  description={option?.description}
                  icon={option?.icon}
                  route={option?.route}
                  gradient={option?.gradient}
                  pattern={option}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Designs & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* User Statistics */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-foreground">Your Progress</h2>
                  <Button variant="ghost" size="sm" iconName="TrendingUp">
                    View Analytics
                  </Button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {userStats?.map((stat, index) => (
                    <StatsCard
                      key={index}
                      title={stat?.title}
                      value={stat?.value}
                      icon={stat?.icon}
                      trend={stat?.trend}
                      trendValue={stat?.trendValue}
                      color={stat?.color}
                    />
                  ))}
                </div>
              </section>

              {/* Recent Designs */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-foreground">Recent Designs</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    iconName="ArrowRight"
                    onClick={() => navigate('/design-gallery')}
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentDesigns?.map((design) => (
                    <RecentDesignCard
                      key={design?.id}
                      design={design}
                      onEdit={handleEditDesign}
                      onShare={handleShareDesign}
                      onDelete={handleDeleteDesign}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Inspiration & Community */}
            <div className="space-y-8">
              {/* Daily Inspiration */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Daily Inspiration</h2>
                  <Icon name="Sparkles" size={20} className="text-primary" />
                </div>
                <div className="space-y-4">
                  {inspirationPatterns?.map((inspiration) => (
                    <InspirationCard key={inspiration?.id} inspiration={inspiration} />
                  ))}
                </div>
              </section>

              {/* Upcoming Festivals */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Upcoming Festivals</h2>
                  <Icon name="Calendar" size={20} className="text-accent" />
                </div>
                <div className="space-y-4">
                  {upcomingFestivals?.map((festival) => (
                    <FestivalCard
                      key={festival?.id}
                      festival={festival}
                      onExplore={handleExploreFestival}
                    />
                  ))}
                </div>
              </section>

              {/* Community Highlights */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Community Highlights</h2>
                  <Icon name="Users" size={20} className="text-success" />
                </div>
                <div className="space-y-4">
                  {communityHighlights?.map((highlight) => (
                    <CommunityHighlight
                      key={highlight?.id}
                      highlight={highlight}
                      onView={handleViewHighlight}
                    />
                  ))}
                </div>
              </section>

              {/* Quick Access Toolbar */}
              <section className="bg-card rounded-xl p-6 shadow-warm">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Access</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    iconName="BookOpen"
                    iconPosition="left"
                    onClick={() => navigate('/design-gallery')}
                  >
                    Pattern Library
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    iconName="GraduationCap"
                    iconPosition="left"
                  >
                    Learn Kolam
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Settings
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;