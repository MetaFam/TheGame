export default {
  overrides: [
    {
      files: ["./src/handlers/actions/types.ts"],
      rules: {
        "@typescript-eslint/naming-convention": "off"
      }
    },
    {
      files: ["./src/handlers/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-console": "off"
      }
    },
    {
      files: ["./src/**/*.ts"],
      rules: {
        "import/extensions": ["error", { "json": "always" }],
        "no-console": "off"
      }
    }
  ]
}
