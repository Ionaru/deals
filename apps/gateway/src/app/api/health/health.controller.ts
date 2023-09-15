import { ServiceHealthDTO } from '@deals/api';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { APITag } from '../../api-tag';

import { HealthService } from './health.service';

@Controller('health')
@ApiTags(APITag.HEALTH)
export class HealthController {
    public constructor(private readonly scrapersService: HealthService) {}

    @Get()
    @ApiOkResponse({ type: [ServiceHealthDTO] })
    public getHealth(): Observable<ServiceHealthDTO[]> {
        return this.scrapersService.getHealth();
    }
}
