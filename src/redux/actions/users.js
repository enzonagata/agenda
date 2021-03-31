//action.js
import { USER_LOGIN_ERROR, USER_LOGIN } from './types';
import { sessionService } from 'redux-react-session';
import { firebaseAuth } from '../../config/firebase';


//Login de usuário
export const userLogin = (user, history) => {
    let email = user.email;
    let pass = user.password;
    let response = {
        token: '1a2b3c4d',
        data: {
          email: user.email,
          firstName: 'test',
          lastName: 'test'
        }
      };
    return dispatch => {
        firebaseAuth.signInWithEmailAndPassword(email, pass)
            .then(a => {
                let uid = a.user.uid;
                let email = a.user.email;
                let name = a.user.displayName;
                let user = a.user;
                console.log(a.user);
                sessionService.saveSession(a.user)
                    .then(() => {
                        console.log(response.data)
                        sessionService.saveUser(a.user)
                            .then(() => {
                                history.push('/');
                            }).catch(err => console.error(err));                        
                    }).catch(err => console.error(err));
                dispatch({ type: 'USER_LOGIN', user })
            })
            .catch(error => {
                console.log(error.code)
                let code = error.code
                let msg;
                switch (code) {
                    case 'auth/too-many-requests':
                        msg = 'Muitas tentativas de login. Tente em alguns minutos...';
                        break;
                    case 'auth/wrong-password':
                        msg = 'Erro de usuário e senha.';
                        break;
                    default:
                }
                dispatch({ type: 'USER_LOGIN_ERROR', msg })
            })
    }
}