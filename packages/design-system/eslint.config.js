export default {
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  overrides: [
    {
      "files": ["./src/**/*.{ts,tsx,js,jsx}", "./stories/**/*.{ts,tsx,js,jsx}"],
      "rules": {
        "no-console": "off"
      }
    }
  ]
}
