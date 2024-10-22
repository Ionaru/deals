import {
  Component,
  ComponentRef,
  InputSignal,
  ProviderToken,
  Type,
} from "@angular/core";
import { MetadataOverride } from "@angular/core/testing";
import { MockComponent, MockProvider } from "ng-mocks";

type ExtractGeneric<Type> = Type extends InputSignal<infer X> ? X : never;

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

export const setComponentInput = <
  T extends ComponentRef<unknown>,
  K extends Extract<keyof T["instance"], string>,
>(
  componentReference: T,
  input: K,
  value: ExtractGeneric<T["instance"][K]>,
) => {
  componentReference.setInput(input, value);
};
