import { IDeal } from '@deals/api';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
    public constructor(private readonly dealsService: DealsService) {}

    @Get()
    @ApiOkResponse({ type: [IDeal] })
    public getData(): Observable<{ deals: IDeal[] }> {
        return this.dealsService
            .getDeals()
            .pipe(map((data) => ({ deals: data })));
    }
}
