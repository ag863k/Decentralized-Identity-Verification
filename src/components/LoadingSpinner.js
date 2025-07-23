import React from 'react';

const VALID_SIZES = ['small', 'medium', 'large'];

const LoadingSpinner = React.memo(({ 
  size = 'medium', 
  message = 'Loading...', 
  overlay = false 
}) => {
  const safeSize = VALID_SIZES.includes(size) ? size : 'medium';
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const spinnerContent = (
    <div 
      className={`loading-spinner ${sizeClasses[safeSize]}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="spinner" aria-hidden="true"></div>
      {message && typeof message === 'string' && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
});

export default LoadingSpinner;
