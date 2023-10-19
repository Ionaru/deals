import {
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from "@nestjs/common";
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
      Logger.error(exception.message, ServiceUnavailableFilter.name);
      throw new GraphQLError("Service not available", {
        extensions: {
          code: HttpStatus[HttpStatus.SERVICE_UNAVAILABLE],
        },
      });
    }
  }
}
