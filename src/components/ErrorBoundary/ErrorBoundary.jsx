import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: ''
    }

    static getDerivedStateFromError(error) {
        return { error: error.toString() };
    }

    componentDidCatch(error, info) {
        console.log(error.toString(), info.componentStack);
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Your error, good sir: </h1>
                    <h2>{this.state.error}</h2>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;