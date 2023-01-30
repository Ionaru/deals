/* eslint-disable */
import { Kruidvat } from './app/services/kruidvat';
import { Jumbo } from './app/services/jumbo';

const kr = new Kruidvat('https://www.kruidvat.nl', [
    `/beauty/haarverzorging/c/20013`,
    `/verzorging/lichaamsverzorging/deodorant/c/30056`,
    `/verzorging/lichaamsverzorging/bad-en-douche-producten/c/30057`,
]);
// kr.scrape();

const jb = new Jumbo('https://www.jumbo.com', [
    '/producten/alle-aanbiedingen',
])

jb.scrape();
