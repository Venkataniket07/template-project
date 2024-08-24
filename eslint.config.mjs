import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      "no-console": "off",
      "no-undef": "error",
      "consistent-return": "error",
      curly: ["error", "all"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prefer-const": [
        "error",
        {
          destructuring: "all",
          ignoreReadBeforeAssign: true,
        },
      ],
      "no-var": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "linebreak-style": ["error", "windows"],
      "no-param-reassign": "error",
      "comma-dangle": ["warn", "always-multiline"],
      "no-return-await": "warn",
      "object-curly-newline": "off",
      eqeqeq: "error",
    },
  },
];
