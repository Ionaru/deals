import { ServiceType } from "../common/service-type.js";

export class ServiceDTO {
  id!: string;

  name!: string;

  queue!: string;

  type!: ServiceType;
}
