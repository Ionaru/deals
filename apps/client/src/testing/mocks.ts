import { Component, ProviderToken, Type } from "@angular/core";
import { MetadataOverride } from "@angular/core/testing";
import { MockComponent, MockProvider } from "ng-mocks";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypedMockProvider = <T>(
  provider: ProviderToken<T>,
  overrides: Partial<T> = {},
) => MockProvider(provider, overrides, "useValue");

export const overrideComponents = (
  ...components: Array<Type<unknown>>
): MetadataOverride<Component> => ({
  add: {
    imports: components.map((c) => MockComponent(c)),
  },
  remove: {
    imports: components,
  },
});
