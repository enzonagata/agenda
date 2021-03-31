import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Error404 extends Component {
  render() {
    return (
      <h1>Erro 404</h1>
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

export default connect(mapStateToProps)(Error404)
