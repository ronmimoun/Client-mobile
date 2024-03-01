import React, { ErrorInfo, PropsWithChildren } from "react";

type GlobalErrorBoundaryProps = {
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showError: boolean;
};

class GlobalErrorBoundary extends React.Component<
  PropsWithChildren<GlobalErrorBoundaryProps>,
  State
> {
  constructor(props: PropsWithChildren<GlobalErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
      showError: true,
    });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <div>{this.state.error.message}</div>;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
