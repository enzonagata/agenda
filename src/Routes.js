import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux'
import { userInfo } from './redux/actions/users';
import { sessionService } from 'redux-react-session';

//Tema
import { ThemeProvider } from '@material-ui/core/styles';
//Pages
import Login from './pages/Login';
import Event from './pages/Event';
import CalendarShow from './pages/CalendarShow';
import CalendarCadastro from './pages/CalendarCadastro';
import Error404 from './pages/Error404';
import { createMuiTheme } from "@material-ui/core";

import PrivateRoute from './PrivateRoute';

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#f44336'
    },
    secondary: {
      main: '#ff1744'
    },
  }
});
const Routes = ({ authenticated, checked }) => (
  <ThemeProvider theme={theme}>
    <Router>
      {checked &&
        <div>
          <Switch>
            <PrivateRoute layout='default' exact path="/" component={CalendarShow} authenticated={authenticated} />
            <PrivateRoute layout='default' exact path="/calendario" component={CalendarShow} authenticated={authenticated} />
            <PrivateRoute layout='login' exact path="/login" component={Login} publicRoute={true} />
            <PrivateRoute layout='default' exact path="/404" publicRoute={true} component={Error404} /> {/*Se não houver nenhuma rota*/}
            <Redirect to="/404" />
          </Switch>
        </div>
      }
    </Router>
  </ThemeProvider>
);

const { bool } = PropTypes;

Routes.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(Routes);
