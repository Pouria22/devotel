import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from '@mui/material';

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Table error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Alert severity="error">Something went wrong!</Alert>;
    }

    return this.props.children;
  }
}