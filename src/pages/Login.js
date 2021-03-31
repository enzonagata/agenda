import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as usersActions from '../redux/actions/users';

import * as sessionActions from '../redux/actions/session';

//Layout
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    }
  }

  componentDidMount() {
    document.title = "Login";
  }

  //Exibe o erro e depois remove ele
  setError = (msg) => {
    this.errorTimer = setTimeout(() => {
      this.setState({ error: '' });
    }, 3000)
    this.setState({ error: msg });
  }


  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { userLogin } = this.props.actions;
    userLogin(this.state, this.props.history);
  }

  render() {
    let disable = false;
    let textButton = 'ENTRAR';
    if (this.state.loading == false) {
      disable = false;
      textButton = 'ENTRAR';
    } else {
      disable = true;
      textButton = 'Verificando...';
    }

    // switch (error.code) {
    //   case 'auth/too-many-requests':
    //     this.setError('Muitas tentativas de login. Tente em alguns minutos...')
    //     break;
    //   case 'auth/wrong-password':
    //     this.setError('Erro de usuário e senha.')
    //     break;
    //   default:
    //   // code block
    // }

    return (
      <div>
        <form noValidate onSubmit={this.onFormSubmit}>
          <TextField margin="normal"
            required
            autoFocus
            autoComplete="email"
            fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
          <TextField margin="normal"
            required
            fullWidth
            autoComplete="current-password"
            type='password' id="standard-basic" label="Senha:" name='password' onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
          <p>{this.state.error}</p>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Continuar conectado"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {textButton}
          </Button>
        </form>
      </div>
    );
  }
}

const { object } = PropTypes;

Login.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
};

export default withRouter(connect(null, mapDispatch)(Login));
