import { DealDTO, DealSortChoices } from '@deals/api';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { APITag } from '../../api-tag';

import { DealsService, Order } from './deals.service';

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
        // description: 'Sort property',
        enum: ['Admin', 'Moderator', 'User'],
        isArray: true,
        name: 'sort',
        // required: false,
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
        @Query('order') order: Order = Order.Ascending,
        @Query('sort') sort: DealSortChoices[] = [DealSortChoices.productName],
        @Query('limit') limit = 10,
        @Query('page') page = 1,
    ) {
        return this.dealsService.getDeals(order, sort, limit, page);
    }
}
