import React, { useEffect, useRef } from 'react';

const ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

const Notification = ({ 
  type = 'info', 
  message = '', 
  isVisible = false, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}) => {
  const closedRef = useRef(false);

  useEffect(() => {
    if (isVisible && autoClose && onClose && !closedRef.current) {
      const timer = setTimeout(() => {
        if (!closedRef.current) {
          closedRef.current = true;
          onClose();
        }
      }, Math.max(1000, duration));
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose, duration]);

  if (!isVisible || !message) return null;

  const icon = ICONS[type] || ICONS.info;

  const handleClose = () => {
    if (!closedRef.current && onClose) {
      closedRef.current = true;
      onClose();
    }
  };

  return (
    <div
      className={`notification ${type}`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      <div className="notification-content">
        <span className="notification-icon" aria-hidden="true">{icon}</span>
        <p className="notification-message">{message}</p>
        {onClose && (
          <button
            onClick={handleClose}
            className="notification-close"
            aria-label="Close notification"
            tabIndex={0}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
