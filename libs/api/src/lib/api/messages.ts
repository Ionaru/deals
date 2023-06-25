import { IDeal } from '../entities/deal';
import { IService } from '../entities/service';
import { IHealthResponse } from '../routes/get-health';

export enum MSMessage {
    GET_DEALS = 'GET_DEALS',
    REGISTER_SERVICE = 'REGISTER_SERVICE',
    UNREGISTER_SERVICE = 'UNREGISTER_SERVICE',
    GET_SERVICES = 'GET_SERVICES',
}

export interface IMSMessage {
    [MSMessage.GET_DEALS]: {
        payload: Record<string, never>;
        response: IDeal[];
    };

    [MSMessage.REGISTER_SERVICE]: {
        payload: {
            name: string;
            queue: string;
            isScraper?: boolean;
        };
        response: IService;
    };

    [MSMessage.UNREGISTER_SERVICE]: {
        payload: {
            queue: string;
        };
        response: void;
    };

    [MSMessage.GET_SERVICES]: {
        payload: Record<string, never>;
        response: IHealthResponse;
    };

    direct: {
        payload: Record<string, never>;
        response: {
            status: string;
            uptime: number;
        };
    };
}

export type MSMPayload<T extends keyof IMSMessage> = IMSMessage[T]['payload'];
export type MSMResponse<T extends keyof IMSMessage> = IMSMessage[T]['response'];
