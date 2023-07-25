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
    public static getAllHabits(): CancelablePromise<Array<{
        id: number;
        name: string;
        description: (string | null);
        category: (string | null);
        created: string;
        lastUpdated: (string | null);
        trackingStartDate: string;
        repeatDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
    }>> {
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
    public static createHabit(
        requestBody: {
            name: string;
            description?: (string | null);
            category?: (string | null);
            trackingStartDate: string;
            repeatDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
        },
    ): CancelablePromise<{
        id: number;
        name: string;
        description: (string | null);
        category: (string | null);
        created: string;
        lastUpdated: (string | null);
        trackingStartDate: string;
        repeatDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
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
    public static deleteHabit(
        habitId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/habits/{habitId}',
            path: {
                'habitId': habitId,
            },
        });
    }

}
