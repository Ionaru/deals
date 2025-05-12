import { UnauthorizedException } from "@nestjs/common";

export const notLoggedInError = new UnauthorizedException(
  "User not logged in or invalid API Key given",
);
