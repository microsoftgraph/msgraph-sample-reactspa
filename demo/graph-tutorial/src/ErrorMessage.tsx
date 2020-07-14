// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <ErrorMessageSnippet>
import React from 'react';
import { Alert } from 'reactstrap';

interface ErrorMessageProps {
  debug: string;
  message: string;
}

export default class ErrorMessage extends React.Component<ErrorMessageProps> {
  render() {
    let debug = null;
    if (this.props.debug) {
      debug = <pre className="alert-pre border bg-light p-2"><code>{this.props.debug}</code></pre>;
    }
    return (
      <Alert color="danger">
        <p className="mb-3">{this.props.message}</p>
        {debug}
      </Alert>
    );
  }
}
// </ErrorMessageSnippet>
