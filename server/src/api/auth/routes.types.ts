/** Types generated for queries found in "src/api/auth/routes.ts" */

/** 'UserExists' parameters type */
export interface IUserExistsParams {
  email?: string | null | void;
}

/** 'UserExists' return type */
export interface IUserExistsResult {
  email: string;
  id: number;
  name: string | null;
  password: string;
}

/** 'UserExists' query type */
export interface IUserExistsQuery {
  params: IUserExistsParams;
  result: IUserExistsResult;
}

/** 'SignupUser' parameters type */
export interface ISignupUserParams {
  email?: string | null | void;
  password?: string | null | void;
}

/** 'SignupUser' return type */
export type ISignupUserResult = void;

/** 'SignupUser' query type */
export interface ISignupUserQuery {
  params: ISignupUserParams;
  result: ISignupUserResult;
}

