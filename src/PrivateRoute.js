import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import LoginLayout from './layouts/LoginLayout';

export default class PrivateRoute extends Component {
  render() {
    const { component: Component, exact = true, path, authenticated, layout, publicRoute = false } = this.props;
    let auth = authenticated;
    if (publicRoute == true) {
      auth = true
    }
    return (
      <Route
        exact={exact}
        path={path}
        render={props => (
          auth ? (
            //Seleciona o tipo de Layout
            publicRoute ? (

              (layout == 'login') ? (
                <LoginLayout>
                  <Component {...props} />
                </LoginLayout>) :
                <DefaultLayout>
                  <Component {...props} />
                </DefaultLayout>


            ) : (
                <DefaultLayout>
                  <Component {...props} />
                </DefaultLayout>
              )

          ) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
        )}
      />
    );
  }
}
