import { IHTTPAPI } from '@deals/api';

export default {
    deals: [
        {
            id: '1',
            price: 100,
            product: {
                id: '1',
                image: 'https://picsum.photos/200/300',
                name: 'Product 1',
                price: 80,
            },
        },
        {
            id: '2',
            price: 200,
            product: {
                id: '2',
                image: 'https://picsum.photos/200/300',
                name: 'Product 2',
                price: 150,
            },
        },
    ],
} as IHTTPAPI['v1/deals']['response'];
