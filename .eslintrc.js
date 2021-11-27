/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "prettier"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.eslint.json",
      "./packages/*/tsconfig.json",
      "./ui/*/tsconfig.json",
    ],
  },
  rules: {
    "no-multiple-empty-lines": "error",
    "no-unused-vars": "warn",
    "max-len": [
      "error",
      { code: 80, ignoreRegExpLiterals: true, ignoreUrls: true },
    ],
    "import/extensions": ["error", "always", { ts: "never", tsx: "never" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/__tests__/*.ts{,x}",
          "**/*.{spec,test}.ts{,x}",
          "**/*.stories.{ts,md}{,x}",
        ],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "import/export": "error",
    "import/no-commonjs": "error",
    "import/no-import-module-exports": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "react/jsx-props-no-spreading": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/*.ts{,x}", "**/*.{spec,test}.ts{,x}"],
      env: { jest: true },
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      plugins: ["jest"],
      rules: {
        "jest/no-if": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-hooks-on-top": "error",
        "jest/prefer-todo": "warn",
        "jest/require-top-level-describe": "error",
      },
      settings: {
        jest: { version: "detect" },
        "import/parsers": { "@typescript-eslint/parser": [".ts{,x}"] },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: ".",
          },
          node: {
            extensions: [".js{,x,on}", ".ts{,x}"],
          },
        },
      },
    },
  ],
};
