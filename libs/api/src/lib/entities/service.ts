import { ServiceType } from '../common/service-type';

export interface IService {
    id: string;
    name: string;
    queue: string;
    type: ServiceType;
}
