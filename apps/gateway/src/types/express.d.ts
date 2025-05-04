import { SessionDTO } from "@deals/api";

declare module "express-session" {
   
  interface SessionData extends SessionDTO {}
}
