import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TextDescriptionInput = ({ onDescriptionChange }) => {
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const kolamTerms = [
    'lotus', 'peacock', 'flower', 'geometric', 'circular', 'square', 'diamond',
    'spiral', 'symmetrical', 'radial', 'traditional', 'temple', 'festival',
    'rangoli', 'dots', 'lines', 'curves', 'petals', 'leaves', 'star',
    'mandala', 'intricate', 'simple', 'complex', 'flowing', 'angular'
  ];

  const exampleDescriptions = [
    "A circular lotus pattern with 8 petals radiating from the center",
    "Geometric diamond shapes connected with flowing curves",
    "Traditional peacock design with intricate tail feathers",
    "Simple square pattern with dots at intersections",
    "Spiral design starting from center with floral motifs",
    "Star-shaped pattern with symmetrical lines and curves"
  ];

  useEffect(() => {
    if (description?.length > 2) {
      const words = description?.toLowerCase()?.split(' ');
      const lastWord = words?.[words?.length - 1];
      
      if (lastWord?.length > 1) {
        const matchingSuggestions = kolamTerms?.filter(term => 
          term?.toLowerCase()?.includes(lastWord) && !description?.toLowerCase()?.includes(term)
        );
        setSuggestions(matchingSuggestions?.slice(0, 5));
        setShowSuggestions(matchingSuggestions?.length > 0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [description]);

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    setDescription(value);
    
    if (value?.length > 10) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        onDescriptionChange(value);
      }, 1500);
    } else {
      setIsAnalyzing(false);
      onDescriptionChange(value);
    }
  };

  const applySuggestion = (suggestion) => {
    const words = description?.split(' ');
    words[words.length - 1] = suggestion;
    const newDescription = words?.join(' ') + ' ';
    setDescription(newDescription);
    setShowSuggestions(false);
    onDescriptionChange(newDescription);
  };

  const useExample = (example) => {
    setDescription(example);
    setShowSuggestions(false);
    onDescriptionChange(example);
  };

  const clearDescription = () => {
    setDescription('');
    setShowSuggestions(false);
    onDescriptionChange('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-foreground mb-2">
          Describe Your Kolam Pattern
        </label>
        <div className="relative">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the Kolam pattern you want to create. For example: 'A circular lotus with 8 petals, geometric lines connecting dots in a square formation...'"
            className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            maxLength={500}
          />
          {description && (
            <button
              onClick={clearDescription}
              className="absolute top-2 right-2 p-1 rounded hover:bg-muted transition-colors"
              title="Clear description"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-muted-foreground">
            {description?.length}/500 characters
          </div>
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-xs text-primary">
              <div className="animate-spin w-3 h-3 border border-primary border-t-transparent rounded-full"></div>
              <span>Analyzing description...</span>
            </div>
          )}
        </div>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-warm-lg z-10">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2">Suggestions:</div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-muted transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {description?.length > 10 && !isAnalyzing && (
        <div className="bg-card border border-border rounded-lg p-3">
          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Brain" size={16} className="mr-2 text-primary" />
            AI Interpretation
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pattern Type:</span>
              <span className="text-foreground">Floral Geometric</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Complexity:</span>
              <span className="text-foreground">Medium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Symmetry:</span>
              <span className="text-foreground">Radial</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elements Detected:</span>
              <span className="text-foreground">Lotus, Geometric Lines</span>
            </div>
          </div>
        </div>
      )}
      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Sparkles" size={16} className="mr-2 text-accent" />
          Example Descriptions
        </h5>
        <div className="space-y-2">
          {exampleDescriptions?.map((example, index) => (
            <button
              key={index}
              onClick={() => useExample(example)}
              className="w-full text-left p-2 text-xs bg-muted rounded hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Description Tips
        </h5>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• Be specific about shapes, patterns, and symmetry</p>
          <p>• Mention traditional elements like lotus, peacock, or geometric forms</p>
          <p>• Describe the overall structure and flow of the pattern</p>
          <p>• Include details about complexity level and style preferences</p>
        </div>
      </div>
    </div>
  );
};

export default TextDescriptionInput;