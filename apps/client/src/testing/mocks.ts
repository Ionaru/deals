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

export const TypedMockProvider = <T>(
  provider: ProviderToken<T>,
  overrides: Partial<T> = {},
) => MockProvider(provider, overrides, "useValue");

export const overrideComponents = (
  ...components: Type<unknown>[]
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
