import { MSMessage } from "@deals/api";
import { ServiceGatewayService } from "@deals/service-registry";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request, Response } from "express";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { firstValueFrom } from "rxjs";

interface Context {
  req: Request;
  res: Response;
}

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private readonly gateway: ServiceGatewayService) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(executionContext);
    const context = gqlContext.getContext<Context>();
    const info = gqlContext.getInfo<GraphQLResolveInfo>();
    const request = context.req;

    const userId = request.session.user;
    if (!userId) {
      this.#warnUnauthorized(request, info, "No user ID in session");
      return false;
    }

    const user = await firstValueFrom(
      this.gateway.send(MSMessage.GET_USER, { id: userId }),
    );
    if (!user) {
      this.#warnUnauthorized(request, info, "Invalid user ID in session");
      return false;
    }

    return true;
  }

  #warnUnauthorized(
    request: Request,
    info: GraphQLResolveInfo,
    reason: string,
  ) {
    const ip = this.#getIp(request);
    const op = info.fieldName;
    Logger.warn(
      `${ip} tried to access resource "${op}", but was unauthenticated: ${reason}`,
      LoggedInGuard.name,
    );
  }

  #getIp(request: Request) {
    return request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  }
}
