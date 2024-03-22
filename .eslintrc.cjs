module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".ts", ".tsx"],
      },
    },
  },
  env: {
    browser: false,
    amd: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
