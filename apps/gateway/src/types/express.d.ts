import { SessionDTO } from "@deals/api";

declare module "express-session" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SessionData extends SessionDTO {}
}
