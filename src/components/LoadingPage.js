import React from 'react';
import { Spinner } from 'reactstrap';

export default class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loader">
        <Spinner color="primary" className="loader__image"/>
      </div>
    );
  }
}