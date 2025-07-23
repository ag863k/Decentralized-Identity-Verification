import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, isReloading: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console and error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to log this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReload = () => {
    if (!this.state.isReloading) {
      this.setState({ isReloading: true }, () => window.location.reload());
    }
  };

  handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, isReloading: false });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🚨 Something went wrong</h2>
            <p>The application encountered an unexpected error.</p>
            
            <div className="error-actions">
              <button 
                onClick={this.handleReload}
                className="primary-button"
                disabled={this.state.isReloading}
              >
                Reload Page
              </button>
              <button 
                onClick={this.handleTryAgain}
                className="secondary-button"
              >
                Try Again
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-details" open>
                <summary>Error Details</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
