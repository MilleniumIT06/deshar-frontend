import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "prettier", "next/core-web-vitals", "next/typescript"],
    rules: {
      "no-console": "warn"
    }
  }),
  
  // Добавленные правила для сортировки импортов
  {
    plugins: {
      import: eslintPluginImport
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    },
    rules: {
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "next/**",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error"
    }
  }
];
export default eslintConfig;