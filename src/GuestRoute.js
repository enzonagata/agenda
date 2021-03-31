import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import LoginLayout from './layouts/LoginLayout';

export default class GuestRoute extends Component {

  render() {
    const { component: Component, exact = true, path, authenticated } = this.props;
    return (
      <LoginLayout>
        <Route
          exact={exact}
          path={path}
          component={Component}
        />
      </LoginLayout>
    );
  }
}
