import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    public constructor(private readonly scrapersService: HealthService) {}

    @Get()
    public getHealth() {
        return this.scrapersService.getHealth();
    }
}
