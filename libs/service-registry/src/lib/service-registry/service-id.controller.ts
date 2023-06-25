import type { MSMResponse } from '@deals/api';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

export const createServiceIdController = (id: string) => {
    @Controller()
    class ServiceIdController {
        @MessagePattern(id)
        public handleDirectMessage(): MSMResponse<'direct'> {
            return { status: 'ok', uptime: process.uptime() };
        }
    }

    return ServiceIdController;
};
