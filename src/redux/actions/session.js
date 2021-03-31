import { connect } from 'react-redux'
import { userInfo, userAuth } from '../actions/users';
import { sessionService } from 'redux-react-session';
import { firebaseAuth } from '../../config/firebase';


// export const login = (user, history) => {
//   let email = user.email;
//   let pass = user.password;
//   return () => {
//     firebaseAuth.signInWithEmailAndPassword(email, pass)
//       .then(a => {
//         let uid = a.user.uid;
//         let email = a.user.email;
//         let name = a.user.displayName;
//         // //Set redux state
//         // this.props.userInfo(name, email, uid);
//         // this.props.userAuth(true);
//         //Remover loading
//         sessionService.saveSession(uid)
//           .then(() => {
//             sessionService.saveUser(a.user)
//               .then(() => {
//                 history.push('/');
//               }).catch(err => console.error(err));
//           }).catch(err => console.error(err));
//       })
//       .catch(error => {
//         switch (error.code) {
//           case 'auth/too-many-requests':
//             error = 'Muitas tentativas de login. Tente em alguns minutos...';
//             break;
//           case 'auth/wrong-password':
//             error = 'Erro de usuário e senha.';
//             break;
//           default:
//         }
//       })
//   };
// };
// // const mapState = ({ session }) => ({
// //   loading: session.checked,
// // });
// // export default connect(mapState)(login);




export const logout = (history) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push('/login');
  };
};