import { registerEnumType } from "@nestjs/graphql";

export enum ServiceType {
  CORE = "core",
  SCRAPER = "scraper",
}

registerEnumType(ServiceType, { name: "ServiceType" });
