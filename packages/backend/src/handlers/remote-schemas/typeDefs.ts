export const typeDefs = `
type Query {
  getBoxProfile(address: String!): BoxProfile
}

type BoxProfile {
  ethereumAddress : String
  name : String
  description : String
  location : String
  job : String
  emoji : String
  imageUrl : String
}

`;
