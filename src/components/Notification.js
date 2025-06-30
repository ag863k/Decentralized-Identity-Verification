// components/Notification.js - Notification component for user feedback

import React, { useEffect } from 'react';

const Notification = ({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose, duration]);

  if (!isVisible || !message) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <span className="notification-icon">{getIcon(type)}</span>
        <p className="notification-message">{message}</p>
        {onClose && (
          <button 
            onClick={onClose} 
            className="notification-close"
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
