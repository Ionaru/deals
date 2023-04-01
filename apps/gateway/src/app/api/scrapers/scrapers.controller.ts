import { Controller, Get } from '@nestjs/common';

import { ScrapersService } from './scrapers.service';

@Controller('scrapers')
export class ScrapersController {
    public constructor(private readonly scrapersService: ScrapersService) {}

    @Get('health')
    public getHealth() {
        return this.scrapersService.getHealth();
    }
}
