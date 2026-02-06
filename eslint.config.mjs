import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const eslintConfig = [
  ...require("eslint-config-next/core-web-vitals"),
  ...require("eslint-config-next/typescript"),
];

export default eslintConfig;
