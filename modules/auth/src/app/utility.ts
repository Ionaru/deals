import { ExecutionContext, Logger } from "@nestjs/common";
import "cookie-parser";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request, Response } from "express";

export interface GqlContext {
  req: Request;
  res: Response;
}

export const getGqlContext = (context: ExecutionContext): GqlContext => {
  return GqlExecutionContext.create(context).getContext<GqlContext>();
};

export const getRequest = (context: ExecutionContext | GqlContext): Request => {
  if ("req" in context) {
    return context.req;
  }

  const restRequest = context.switchToHttp().getRequest<Request>();
  if (restRequest) {
    return restRequest;
  }

  return getGqlContext(context).req;
};

export const getResponse = (
  context: ExecutionContext | GqlContext,
): Response => {
  if ("res" in context) {
    return context.res;
  }

  const restResponse = context.switchToHttp().getResponse<Response | object>();
  if ("req" in restResponse) {
    return restResponse;
  }

  return getGqlContext(context).res;
};

export const getSpecificCookie = (
  data: string,
  context: ExecutionContext,
): string | undefined => {
  const request = getRequest(context);
  const cookie = request.cookies[data] as unknown;
  if (typeof cookie === "string" || cookie === undefined) {
    return cookie;
  } else {
    Logger.warn(
      `Unexpected cookie type for ${data}, got ${typeof cookie}.`,
      getSpecificCookie.name,
    );
  }
  return undefined;
};

export const getAllCookies = (context: ExecutionContext) => {
  const request = getRequest(context);
  return request.cookies;
};
