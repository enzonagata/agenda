import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'


class CalendarCadastro extends Component {

  render() {
    return (
      <div>
        <h1>Cadastro</h1>
        <div>{this.props.state.user.name}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     userInfo: (data) => {
//       dispatch(userInfo(data))
//     },
//   }
// }

export default connect(mapStateToProps)(CalendarCadastro)
