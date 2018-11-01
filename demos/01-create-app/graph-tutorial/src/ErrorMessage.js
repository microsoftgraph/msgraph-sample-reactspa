import React from 'react';
import { Alert } from 'reactstrap';

export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);

    this.message = props.message;
    this.debug = props.debug;
  }

  render() {
    let debug = null;
    if (this.debug) {
      debug = <pre className="alert-pre border bg-light p-2"><code>{this.debug}</code></pre>;
    }
    return (
      <Alert color="danger">
        <p className="mb-3">{this.message}</p>
        {debug}
      </Alert>
    );
  }
}