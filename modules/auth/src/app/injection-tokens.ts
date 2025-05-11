import { InjectionToken, Provider } from "@nestjs/common";

export const provideValue = <T>(
  provide: InjectionToken<T>,
  useValue: T,
): Provider<T> => ({
  provide,
  useValue,
});

export const JWT_SECRET: InjectionToken<string> = "JWT_SECRET";
