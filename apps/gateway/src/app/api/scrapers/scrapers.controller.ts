import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { APITag } from '../../api-tag';

import { ScrapersService } from './scrapers.service';

@Controller('scrapers')
@ApiTags(APITag.SCRAPERS)
export class ScrapersController {
    public constructor(private readonly scrapersService: ScrapersService) {}

    @Get('health')
    public getHealth() {
        return this.scrapersService.getHealth();
    }
}
