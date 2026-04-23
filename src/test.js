import { authApi } from './lib/api';

authApi.login({ email: 'alexis@test.com', password: 'newpassword123' })
  .then(data => console.log('OK', data))
  .catch(err => console.error('ERREUR', err));