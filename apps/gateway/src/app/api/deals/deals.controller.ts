import { DealDTO } from '@deals/api';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

import { APITag } from '../../api-tag';

import { DealsService } from './deals.service';

@Controller('deals')
@ApiTags(APITag.DEALS)
export class DealsController {
    public constructor(private readonly dealsService: DealsService) {}

    @Get()
    @ApiOkResponse({ type: [DealDTO] })
    public getData(): Observable<{ deals: DealDTO[] }> {
        return this.dealsService
            .getDeals()
            .pipe(map((data) => ({ deals: data })));
    }
}
