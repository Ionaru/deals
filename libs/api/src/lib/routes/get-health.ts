export type IHealthRequest = Record<string, never>;

export interface IHealthResponse {
    [key: string]: {
        ok: boolean;
        uptime: number;
    };
}
