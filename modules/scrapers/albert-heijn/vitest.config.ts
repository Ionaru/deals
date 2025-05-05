import { mergeConfig, defineProject } from "vitest/config";

import rootConfig from "../../../vitest.root.js";

export default mergeConfig(rootConfig, defineProject({}));
