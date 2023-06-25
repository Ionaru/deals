import { IService } from '../entities/service';

export type IHealthRequest = Record<string, never>;

interface HealthResponse extends IService {
    status: {
        status: string;
        uptime?: number;
    };
}

export type IHealthResponse = HealthResponse[];
