import "jest-preset-angular/setup-jest";
import "@angular/localize/init";

// Fix for "ReferenceError: TextEncoder is not defined"
// https://github.com/angular/angular/issues/48748
// eslint-disable-next-line @typescript-eslint/no-shadow
import { TextEncoder } from "node:util";
Object.defineProperty(global, "TextEncoder", {
  value: TextEncoder,
  writable: true,
});
