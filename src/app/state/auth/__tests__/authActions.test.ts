import { AuthAction } from '../authActions';

describe('authActions', () => {
  test('Auth actions skal begynne med "Auth_"', () => {
    Object.values(AuthAction).forEach(authName => {
      expect(authName).toStartWith('Auth_');
    });
  });
});
