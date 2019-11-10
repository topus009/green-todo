import React, { Component } from 'react';
import { node } from 'prop-types';

const propTypes = {
  children: node.isRequired,
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div className="errorBoundary">
          <h2>Something went wrong.</h2>
          <details>
            {error?.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = propTypes;

export default ErrorBoundary;
