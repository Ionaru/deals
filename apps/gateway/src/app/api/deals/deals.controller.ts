import { Controller, Get } from '@nestjs/common';
import { map } from 'rxjs';

import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
    public constructor(private readonly dealsService: DealsService) {}

    @Get()
    public getData() {
        return this.dealsService.getDeals().pipe(map((data) => ({ deals: data })));
    }
}
