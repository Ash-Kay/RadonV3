module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "baseui"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    rules: {
        "baseui/deprecated-theme-api": "warn",
        "baseui/deprecated-component-api": "warn",
        "baseui/no-deep-imports": "warn",
    },
};
