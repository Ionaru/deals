import { IRequest } from '@deals/api';

export default {
    gateway: {
        ok: true,
        uptime: 0,
    },
    storage: {
        ok: true,
        uptime: 0,
    },
} as IRequest['v1/health']['response'];
