import { IRequest } from '@deals/api';

export default {
    deals: [
        {
            id: '1',
            price: 100,
            product: {
                id: '1',
                image: 'https://static-images.jumbo.com/product_images/060120221545_232278STK-1_360x360_2.png',
                name: 'Product 1',
                price: 80,
            },
        },
        {
            id: '2',
            price: 200,
            product: {
                id: '2',
                image: 'https://static-images.jumbo.com/product_images/080120221402_213136ZK-1_360x360_2.png',
                name: 'Product 2',
                price: 150,
            },
        },
    ],
} as IRequest['v1/deals']['response'];
