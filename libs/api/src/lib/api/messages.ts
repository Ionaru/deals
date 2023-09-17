import { registerEnumType } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';

import { ScraperStatus } from '../common/scraper-status';
import { ServiceType } from '../common/service-type';
import { DealDTO, DealSortChoices } from '../entities/deal';
import { ServiceDTO } from '../entities/service';
import { IHealthResponse } from '../routes/get-health';

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
    SCRAPER_STATUS = 'SCRAPER_STATUS',
    START_SCRAPER = 'START_SCRAPER',
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
            id: number;
        };
        response: DealDTO;
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

    [MSMessage.GET_SERVICES]: {
        payload: Record<string, never>;
        response: IHealthResponse;
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
