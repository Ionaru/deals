import { ServiceType } from "../common/service-type";

export class ServiceDTO {
  id!: string;

  name!: string;

  queue!: string;

  type!: ServiceType;
}
