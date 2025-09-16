import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ design, designs, isOpen, onClose, onConfirm }) => {
  const isMultiple = Array.isArray(designs) && designs?.length > 1;
  const designCount = isMultiple ? designs?.length : 1;
  const designName = isMultiple ? `${designCount} designs` : design?.name;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl border border-border max-w-md w-full shadow-warm-xl">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trash2" size={32} className="text-error" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Delete {isMultiple ? 'Designs' : 'Design'}
          </h2>
          <p className="text-muted-foreground">
            Are you sure you want to delete {designName}? This action cannot be undone.
          </p>
        </div>

        {/* Content */}
        {!isMultiple && design && (
          <div className="px-6 pb-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={design?.thumbnail}
                  alt={design?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {design?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(design.createdAt)?.toLocaleDateString('en-IN')}
                </p>
                <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                  <span>{design?.likes} likes</span>
                  <span>•</span>
                  <span>{design?.downloads} downloads</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMultiple && (
          <div className="px-6 pb-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Icon name="Image" size={20} />
                <span className="font-medium">
                  {designCount} designs selected for deletion
                </span>
              </div>
              <div className="mt-2 text-center text-sm text-muted-foreground">
                This will permanently remove all selected designs from your gallery
              </div>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="px-6 pb-4">
          <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">
                This action is permanent
              </p>
              <p className="text-muted-foreground">
                {isMultiple 
                  ? 'All selected designs will be permanently deleted and cannot be recovered.'
                  : 'This design will be permanently deleted and cannot be recovered.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            iconName="Trash2"
            onClick={onConfirm}
          >
            Delete {isMultiple ? 'Designs' : 'Design'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;