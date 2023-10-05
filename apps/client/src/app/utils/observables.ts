import { ApolloError } from "@apollo/client/errors";
import { catchError, map, Observable, of } from "rxjs";

export interface ApolloHandled<T> {
  data?: T;
  error?: ApolloError;
}

export const withApolloErrorHandling = <T>(
  source: Observable<T>,
): Observable<ApolloHandled<T>> =>
  source.pipe(
    catchError((error: unknown) => {
      if (error instanceof ApolloError) {
        return of(error);
      } else if (error instanceof Error) {
        return of(new ApolloError({ clientErrors: [error] }));
      }
      return of(
        new ApolloError({
          clientErrors: [new Error("Unknown error", { cause: error })],
        }),
      );
    }),
    map((data) => ({
      data: data instanceof ApolloError ? undefined : data,
      error: data instanceof ApolloError ? data : undefined,
    })),
  );
