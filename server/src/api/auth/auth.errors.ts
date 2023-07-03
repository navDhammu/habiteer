export class AuthError extends Error {
   public readonly httpCode: number;

   constructor(errorName: AuthErrorName) {
      super(AUTH_ERRORS[errorName].message);
      this.httpCode = AUTH_ERRORS[errorName].httpCode;
      this.name = errorName;
   }
}

export enum AuthErrorName {
   USER_EXISTS = 'USER_EXISTS',
   INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

type AuthErrors = {
   [key in AuthErrorName]: {
      message: string;
      httpCode: number;
   };
};

const AUTH_ERRORS: AuthErrors = {
   USER_EXISTS: {
      message: 'User already exists',
      httpCode: 409,
   },
   INVALID_CREDENTIALS: {
      message: 'Invalid email or password combination',
      httpCode: 401,
   },
};
