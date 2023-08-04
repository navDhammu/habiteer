export interface SignupReqBody {
   /**
    *@format email
    */
   email: string;

   /**
    *@minLength 6
    */
   password: string;

   /**
    * @minLength 6
    */
   confirmPassword: string;
}

export interface LoginReqBody
   extends Pick<SignupReqBody, 'email' | 'password'> {}
