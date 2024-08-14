export default {
  overrides: [
    {
      files: ["./src/**/*.ts", "./test/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "class-methods-use-this": "off",
        "no-console": "off"
      }
    }
  ]
}
