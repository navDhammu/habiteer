import { HttpStatusText } from './HttpStatusText';

export const BASE_URL = 'http://localhost:3000/api';

export default async function fetchWrapper(
   path: RequestInfo,
   options: RequestInit
) {
   const response = await fetch(path, options);
   if (!response.ok) {
      const CustomError = new Error();
      CustomError.name = response.statusText;
      console.log(CustomError);
      throw CustomError;
   }
   return response;
}

export class APIError extends Error {
   public readonly httpCode: number;
   public readonly statusText: HttpStatusText;

   constructor(response: Response) {
      super();
      this.httpCode = response.status;
      this.statusText = response.statusText as HttpStatusText;
   }
}
