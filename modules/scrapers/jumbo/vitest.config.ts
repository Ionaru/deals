import { mergeConfig, defineProject } from "vitest/config";

import rootConfig from "../../../vitest.config.js";

export default mergeConfig(rootConfig, defineProject({}));
