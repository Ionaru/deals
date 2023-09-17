import { DealDTO, DealSortChoices, Order } from '@deals/api';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { APITag } from '../../api-tag';

import { DealsService } from './deals.service';

@Controller('deals')
@ApiTags(APITag.DEALS)
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Get()
    @ApiQuery({
        description: 'Sort order',
        enum: Order,
        name: 'order',
        required: false,
    })
    @ApiQuery({
        description: 'Sort property',
        enum: DealSortChoices,
        isArray: true,
        name: 'sort',
        required: false,
    })
    @ApiQuery({
        description: 'Limit',
        name: 'limit',
        required: false,
        type: Number,
    })
    @ApiQuery({
        description: 'Page',
        name: 'page',
        required: false,
        type: Number,
    })
    @ApiOkResponse({ type: [DealDTO] })
    getData(
        @Query('order') order: Order = Order.ASCENDING,
        @Query('sort') sort: DealSortChoices[] = [DealSortChoices.PRODUCT_NAME],
        @Query('limit') limit = 10,
        @Query('page') page = 1,
    ) {
        return this.dealsService.getDeals(order, sort, limit, page);
    }
}
