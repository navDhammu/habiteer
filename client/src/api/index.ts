import { HttpStatusText } from './HttpStatusText';

export default async function fetchWrapper(
   path: RequestInfo,
   options: RequestInit
) {
   const response = await fetch(path, options);
   if (!response.ok) throw new APIError(response);
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
