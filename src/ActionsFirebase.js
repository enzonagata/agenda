
import { firebaseAuth } from './config/firebase';

export const login = (user) => {
  let email = user.email;
  let pass = user.password;
  let error;

  firebaseAuth.signInWithEmailAndPassword(email, pass)
    .then(a => {
      let uid = a.user.uid;
      let email = a.user.email;
      let name = a.user.displayName;
      //Set redux state
      this.props.userInfo(name, email, uid);
      this.props.userAuth(true);
      //Remover loading
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/too-many-requests':
          error = 'Muitas tentativas de login. Tente em alguns minutos...';
          break;
        case 'auth/wrong-password':
          error = 'Erro de usuário e senha.';
          break;
        default:
        // code block
      }
    })
  
  const response = {
    token: '1a2b3c4d',
    error: error,
    data: {
      email: 'teste@teste.com.br',
      firstName: 'test',
      lastName: 'test'
    }
  };
  return new Promise(resolve => setTimeout(resolve(response), 1000));
};

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};