/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HabitsService {
   /**
    * @returns any Default Response
    * @throws ApiError
    */
   public static getHabits(): CancelablePromise<
      Array<{
         id: number;
         name: string;
         description: string | null;
         repeatDays: Array<
            | 'Sunday'
            | 'Monday'
            | 'Tuesday'
            | 'Wednesday'
            | 'Thursday'
            | 'Friday'
            | 'Saturday'
         >;
         created: string;
         lastUpdated: string | null;
         userId: number;
         category: string | null;
         trackingStartDate: string;
      }>
   > {
      return __request(OpenAPI, {
         method: 'GET',
         url: '/api/habits',
      });
   }

   /**
    * @param requestBody
    * @returns any Default Response
    * @throws ApiError
    */
   public static createHabit(requestBody: {
      name: string;
      description?: string | null;
      repeatDays: Array<
         | 'Sunday'
         | 'Monday'
         | 'Tuesday'
         | 'Wednesday'
         | 'Thursday'
         | 'Friday'
         | 'Saturday'
      >;
      created?: string;
      lastUpdated?: string | null;
      userId: number;
      category?: string | null;
      trackingStartDate: string;
   }): CancelablePromise<{
      id: number;
      name: string;
      description: string | null;
      repeatDays: Array<
         | 'Sunday'
         | 'Monday'
         | 'Tuesday'
         | 'Wednesday'
         | 'Thursday'
         | 'Friday'
         | 'Saturday'
      >;
      created: string;
      lastUpdated: string | null;
      userId: number;
      category: string | null;
      trackingStartDate: string;
   }> {
      return __request(OpenAPI, {
         method: 'POST',
         url: '/api/habits',
         body: requestBody,
         mediaType: 'application/json',
      });
   }

   /**
    * @param id
    * @returns any Default Response
    * @throws ApiError
    */
   public static deleteHabit(id: number): CancelablePromise<any> {
      return __request(OpenAPI, {
         method: 'DELETE',
         url: '/api/habits/{habitId}',
         path: {
            id: id,
         },
      });
   }

   /**
    * @param from
    * @param to
    * @returns any Default Response
    * @throws ApiError
    */
   public static getCompletions(
      from: string,
      to: string
   ): CancelablePromise<
      Array<{
         id: number;
         habitId: number;
         completionStatus: 'complete' | 'incomplete' | 'pending';
         completionStatusTimestamp: string | null;
         scheduledDate: string;
      }>
   > {
      return __request(OpenAPI, {
         method: 'GET',
         url: '/api/habits/completions',
         query: {
            from: from,
            to: to,
         },
      });
   }

   /**
    * @param id
    * @param requestBody
    * @returns any Default Response
    * @throws ApiError
    */
   public static updateCompletionStatus(
      id: number,
      requestBody: {
         completionStatus: 'complete' | 'incomplete' | 'pending';
      }
   ): CancelablePromise<{
      id: number;
      habitId: number;
      completionStatus: 'complete' | 'incomplete' | 'pending';
      completionStatusTimestamp: string | null;
      scheduledDate: string;
   }> {
      return __request(OpenAPI, {
         method: 'PATCH',
         url: '/api/habits/completions/{id}',
         path: {
            id: id,
         },
         body: requestBody,
         mediaType: 'application/json',
      });
   }
}
