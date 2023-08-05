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
         category: string | null;
         created: string;
         description: string | null;
         id: number;
         lastUpdated: string | null;
         name: string;
         repeatDays: Array<
            | 'Friday'
            | 'Monday'
            | 'Saturday'
            | 'Sunday'
            | 'Thursday'
            | 'Tuesday'
            | 'Wednesday'
         >;
         trackingStartDate: string;
         userId: number;
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
      category?: string | null;
      description?: string | null;
      name: string;
      repeatDays: Array<
         | 'Friday'
         | 'Monday'
         | 'Saturday'
         | 'Sunday'
         | 'Thursday'
         | 'Tuesday'
         | 'Wednesday'
      >;
      trackingStartDate: string;
   }): CancelablePromise<{
      category: string | null;
      created: string;
      description: string | null;
      id: number;
      lastUpdated: string | null;
      name: string;
      repeatDays: Array<
         | 'Friday'
         | 'Monday'
         | 'Saturday'
         | 'Sunday'
         | 'Thursday'
         | 'Tuesday'
         | 'Wednesday'
      >;
      trackingStartDate: string;
      userId: number;
   }> {
      return __request(OpenAPI, {
         method: 'POST',
         url: '/api/habits',
         body: requestBody,
         mediaType: 'application/json',
      });
   }

   /**
    * @param habitId
    * @returns any Default Response
    * @throws ApiError
    */
   public static deleteHabit(habitId: number): CancelablePromise<any> {
      return __request(OpenAPI, {
         method: 'DELETE',
         url: '/api/habits/{habitId}',
         path: {
            habitId: habitId,
         },
      });
   }

   /**
    * @param date
    * @returns any Default Response
    * @throws ApiError
    */
   public static getCompletions(date?: string): CancelablePromise<
      Array<{
         category: string | null;
         completionStatus: 'complete' | 'incomplete' | 'pending';
         completionStatusTimestamp: string | null;
         description: string | null;
         habitId: number;
         id: number;
         name: string;
         scheduledDate: string;
      }>
   > {
      return __request(OpenAPI, {
         method: 'GET',
         url: '/api/habits/completions',
         query: {
            date: date,
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
      category: string | null;
      completionStatus: 'complete' | 'incomplete' | 'pending';
      completionStatusTimestamp: string | null;
      description: string | null;
      habitId: number;
      id: number;
      name: string;
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
