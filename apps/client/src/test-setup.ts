import "@analogjs/vitest-angular/setup-zone";

import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import "@angular/localize/init";

// Fix for "ReferenceError: TextEncoder is not defined"
// https://github.com/angular/angular/issues/48748

// import { TextEncoder } from "node:util";
// Object.defineProperty(globalThis, "TextEncoder", {
//   value: TextEncoder,
//   writable: true,
// });

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// const ignoredMessages = ["Could not find Angular Material core theme."];
// vitest.spyOn(console, "warn").mockImplementation((message: string) => {
//   if (
//     ignoredMessages.some((ignoredMessage) => message.includes(ignoredMessage))
//   ) {
//     return;
//   }
//   console.warn(message);
// });
