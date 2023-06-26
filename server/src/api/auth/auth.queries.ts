/** Types generated for queries found in "src/api/auth/auth.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUserByEmail' parameters type */
export interface IGetUserByEmailParams {
  email?: string | null | void;
}

/** 'GetUserByEmail' return type */
export interface IGetUserByEmailResult {
  email: string;
  id: number;
  name: string | null;
  password: string;
}

/** 'GetUserByEmail' query type */
export interface IGetUserByEmailQuery {
  params: IGetUserByEmailParams;
  result: IGetUserByEmailResult;
}

const getUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":39}]}],"statement":"SELECT * FROM users WHERE email = :email LIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE email = :email LIMIT 1
 * ```
 */
export const getUserByEmail = new PreparedQuery<IGetUserByEmailParams,IGetUserByEmailResult>(getUserByEmailIR);


/** 'CreateNewUser' parameters type */
export interface ICreateNewUserParams {
  email?: string | null | void;
  password?: string | null | void;
}

/** 'CreateNewUser' return type */
export type ICreateNewUserResult = void;

/** 'CreateNewUser' query type */
export interface ICreateNewUserQuery {
  params: ICreateNewUserParams;
  result: ICreateNewUserResult;
}

const createNewUserIR: any = {"usedParamSet":{"email":true,"password":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":49}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":60}]}],"statement":"INSERT INTO users (email, password) VALUES (:email, :password)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (email, password) VALUES (:email, :password)
 * ```
 */
export const createNewUser = new PreparedQuery<ICreateNewUserParams,ICreateNewUserResult>(createNewUserIR);


