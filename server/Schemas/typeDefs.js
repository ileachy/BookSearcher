//import graphql
const { gql } = require("apollo-server-express");
// define typedefs
const typeDefs = gql`
  input SearchBook {
    bookId: String
    authers: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(addBook: SearchBook!): User
    removeBook(bookId: ID!): User
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authers: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
`;

//export
module.exports = typeDefs;
