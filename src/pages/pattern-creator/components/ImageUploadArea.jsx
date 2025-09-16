import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageUploadArea = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (!file?.type?.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file?.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        file: file,
        url: e?.target?.result,
        name: file?.name,
        size: file?.size,
        type: file?.type
      };
      
      setUploadedImage(imageData);
      onImageUpload(imageData);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    };
    reader?.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    onImageUpload(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  if (uploadedImage) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Uploaded Image</h4>
          <button
            onClick={removeImage}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Remove image"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="relative bg-card border border-border rounded-lg overflow-hidden">
          <Image
            src={uploadedImage?.url}
            alt={uploadedImage?.name}
            className="w-full h-64 object-cover"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-foreground">Processing image...</p>
                <p className="text-xs text-muted-foreground">Analyzing pattern structure</p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileImage" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{uploadedImage?.name}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Size: {(uploadedImage?.size / 1024 / 1024)?.toFixed(2)} MB</p>
            <p>Type: {uploadedImage?.type}</p>
            {!isProcessing && (
              <div className="flex items-center space-x-1 text-success mt-2">
                <Icon name="CheckCircle" size={12} />
                <span>Pattern analysis complete</span>
              </div>
            )}
          </div>
        </div>
        {!isProcessing && (
          <div className="bg-card border border-border rounded-lg p-3">
            <h5 className="text-sm font-medium text-foreground mb-2">Pattern Recognition Results</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Symmetry Type:</span>
                <span className="text-foreground">Radial (8-fold)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Complexity Level:</span>
                <span className="text-foreground">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Traditional Style:</span>
                <span className="text-foreground">Tamil Nadu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="text-success">87%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            dragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={dragActive ? "Download" : "Upload"} size={24} />
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              {dragActive ? 'Drop your image here' : 'Upload Kolam Image'}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop an image file, or click to browse
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Supported formats: JPG, PNG, GIF, WebP</p>
              <p>Maximum file size: 5MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Upload Tips
        </h5>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• High contrast images work best for pattern recognition</p>
          <p>• Ensure the Kolam pattern is clearly visible and centered</p>
          <p>• Avoid images with complex backgrounds or multiple patterns</p>
          <p>• Traditional white rice flour on dark ground gives optimal results</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadArea;