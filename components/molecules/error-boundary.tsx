"use client";

import * as React from "react";
import { Button } from "@/components/atoms/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | null; reset: () => void }>;
}

/**
 * Error boundary component for graceful error handling
 * Catches React errors and displays a fallback UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error} reset={this.reset} />;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-500/50 bg-red-500/10 p-8">
          <h2 className="mb-4 text-xl font-semibold text-red-400">
            Something went wrong
          </h2>
          <p className="mb-4 text-sm text-gray-400">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button onClick={this.reset} variant="outline">
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

