import { MSMessage } from '@deals/api';
import { ServiceGatewayService } from '@deals/service-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapersService {
    public constructor(private gateway: ServiceGatewayService) {}

    public getHealth() {
        return this.gateway.send(MSMessage.GET_SERVICES, {});
    }

    public startScraping(name: string) {
        this.gateway.sendCommand(name).subscribe();
    }
}
