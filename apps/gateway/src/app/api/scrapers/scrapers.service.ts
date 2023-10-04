import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapersService {
    constructor(private readonly gateway: ServiceGatewayService) {}

    startScraping(name: string) {
        this.gateway.sendCommand(name).subscribe();
    }
}
