declare module 'fake-tag' {
  function gql(
    literals: TemplateStringsArray,
    ...placeholders: string[]
  ): string;
  export = gql;
}
