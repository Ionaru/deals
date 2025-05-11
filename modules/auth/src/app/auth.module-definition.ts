import { ConfigurableModuleBuilder } from "@nestjs/common";

import { AuthModuleOptions } from "./auth.module-options.js";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthModuleOptions>().build();
