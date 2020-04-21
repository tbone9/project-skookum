import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
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