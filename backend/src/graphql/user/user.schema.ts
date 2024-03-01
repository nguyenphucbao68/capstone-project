import { gql } from "apollo-server-express";

const UserSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  scalar Bytea
  type UserPayload {
    id: ID!
    name: String!
    email: String!
    password: Bytea 
    dob: Date
  }
  type AuthPayload {
    authToken: String!
    user: UserPayload
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    user(id: ID!): UserPayload
    users: [UserPayload]
    currentUser: UserPayload
    helloWord: String
  }

  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input UserInput {
    name: String!
    email: String!
    phone: String!
    gender: Int
    dob: String!
    current_address: String!
    about_me: String!
    role: Int
    img_url: String
    personal_link: String
  }
  input UserCreate {
    name: String!
    email: String!
    password: String!
  }
  input SigninInput {
    email: String!
    password: String!
  }

  # ---------------------------------------------------------
  # Mutations
  # ---------------------------------------------------------
  extend type Mutation {
    createUser(input: UserCreate!): UserPayload
    updateUser(id: ID!, input: UserInput!): UserPayload
    deleteUser(id: ID!): UserPayload
    signUp(input: UserCreate!): String
    signIn(input: SigninInput!): AuthPayload
    resetPassword(email: String!): String
  }
`;

export default UserSchema;
