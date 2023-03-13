import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { map } from 'rxjs';

@Controller('deals')
export class AppController {
    public constructor(private readonly appService: AppService) {}

    @Get()
    public getData() {
        return this.appService.getData().pipe(
            map((data) => ({ deals: data })),
        );
    }
}
