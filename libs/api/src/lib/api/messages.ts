import { registerEnumType } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';

import { Async } from '../api';
import { ScraperStatus } from '../common/scraper-status';
import { ServiceType } from '../common/service-type';
import { DealDTO, DealSortChoices } from '../entities/deal';
import { ServiceDTO } from '../entities/service';
import { HealthResponse } from '../routes/get-health';

export type Nullable<T> = T | null;

export enum Order {
    ASCENDING = 'ASC',
    DESCENDING = 'DESC',
}

registerEnumType(Order, { name: 'Order' });

export enum MSMessage {
    GET_DEAL = 'GET_DEAL',
    GET_DEALS = 'GET_DEALS',
    REGISTER_SERVICE = 'REGISTER_SERVICE',
    UNREGISTER_SERVICE = 'UNREGISTER_SERVICE',
    GET_SERVICES = 'GET_SERVICES',
    GET_SERVICE = 'GET_SERVICE',
    SCRAPER_STATUS = 'SCRAPER_STATUS',
    START_SCRAPER = 'START_SCRAPER',
    GET_CHALLENGE = 'GET_CHALLENGE',
    CHECK_CHALLENGE = 'CHECK_CHALLENGE',
    LOGIN_USER = 'LOGIN_USER',
    REGISTER_USER = 'REGISTER_USER',
}

export interface IMSMessage {
    [MSMessage.START_SCRAPER]: {
        payload: {
            name: string;
        };
        response: void;
    };

    [MSMessage.GET_DEAL]: {
        payload: {
            id: string;
        };
        response: Nullable<DealDTO>;
    };

    [MSMessage.GET_DEALS]: {
        payload: {
            sort: DealSortChoices[];
            order: Order;
            limit: number;
            page: number;
        };
        response: Pagination<DealDTO>;
    };

    [MSMessage.REGISTER_SERVICE]: {
        payload: {
            name: string;
            queue: string;
            type: ServiceType;
        };
        response: ServiceDTO;
    };

    [MSMessage.UNREGISTER_SERVICE]: {
        payload: {
            queue: string;
        };
        response: void;
    };

    [MSMessage.GET_CHALLENGE]: {
        payload: Record<string, never>;
        response: string;
    };

    [MSMessage.CHECK_CHALLENGE]: {
        payload: {
            challenge: string;
        };
        response: boolean;
    };

    [MSMessage.LOGIN_USER]: {
        payload: {
            authentication: string;
        };
        response: boolean;
    };

    [MSMessage.REGISTER_USER]: {
        payload: {
            registration: string;
        };
        response: boolean;
    };

    [MSMessage.GET_SERVICES]: {
        payload: Record<string, never>;
        response: HealthResponse[];
    };

    [MSMessage.GET_SERVICE]: {
        payload: {
            id: string;
        };
        response: Nullable<HealthResponse>;
    };

    [MSMessage.SCRAPER_STATUS]: {
        payload: Record<string, never>;
        response: ScraperStatus;
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
export type AMSMResponse<T extends keyof IMSMessage> = Async<MSMResponse<T>>;
