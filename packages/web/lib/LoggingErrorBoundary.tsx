import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  error?: string;
}

class LoggingErrorBoundary extends Component<Props, State> {
  public state: State = {};

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error: error.message ?? error ?? 'Unknown Error' };
  }

  // eslint-disable-next-line class-methods-use-this
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { error } = this.state;
    if (error) {
      return (
        <h1>
          Sorry… There was an error: <q>{error}</q>
        </h1>
      );
    }

    return this.props.children;
  }
}

export default LoggingErrorBoundary;
