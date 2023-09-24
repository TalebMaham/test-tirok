const { gql } = require('apollo-server');

// Schéma GraphQL avec authentification
const typeDefs = gql`
  type Token {
    id: ID!
    owner: User!
    value: Float!
  }

  type SmartContract {
    id: ID!
    name: String!
    tokens: [Token!]!
    owner: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password : String!
    isBuyer: Boolean
    isSeller: Boolean
    tokens: [Token!]!
    smartContracts: [SmartContract!]!
  }

  type Prop {
    id: Int!
    seller: Int!
    description: String
    loc: String
    value: Float
    stat: String
    investorShare: Float
    acquirerShare: Float
    contracts: [SmartContract!]!
    tokens: [Token!]!
}

  type Query {
    getSmartContract(contractId: ID!): SmartContract
    getAllSmartContracts: [SmartContract!]!
    getToken(tokenId: ID!): Token
    getAllTokens: [Token!]!
    getAvailableTokens: [Token!]!
    getUser(userId: ID!): User
    getAllUsers: [User!]!
    getProp(propId :ID) :Prop
    getAllProp :[Prop!]!
    getAvailableProp :[Prop!]!
  }

  type Mutation {
    createSmartContract(name: String!): SmartContract
    purchaseTokens(tokenId: ID!): Token
    receiveRent(contractId: ID!, rentAmount: Float!): Float
    transferTokens(tokenId: ID!, newOwner: ID!): Token
    setUserAsBuyer(userId: ID!): User
    setUserAsSeller(userId: ID!): User
    buyProperty(propId: Int!): Prop
    tokenizeProperty(sellerId: Int!, description: String!, loc: String!, value: Float!): Prop
    sellProperty(propId: Int!): Prop

  }
`;
module.exports = typeDefs;
