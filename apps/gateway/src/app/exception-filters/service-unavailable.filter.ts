import { Catch, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@Catch()
export class ServiceUnavailableFilter implements GqlExceptionFilter {
  catch(exception: HttpException, _host: ArgumentsHost) {
    if (
      exception.message.startsWith(
        "Empty response. There are no subscribers listening to that message",
      )
    ) {
      Logger.error(exception.message);
      throw new GraphQLError("Service not available", {
        extensions: {
          code: "SERVICE_UNAVAILABLE",
        },
      });
    }
  }
}
