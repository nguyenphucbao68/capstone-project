import { gql } from "apollo-server-express";
const ShopSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  scalar Bytea
  type AuthPayload {
    authToken: String!
    user: User
  }
  type User {
    id: String!
    name: String!
    email: String!
    bod: String
    phone: String
    gender: String
    current_address: String
    about_me: String
    cover_letter: String
    personal_link: String
    role: Int
    img_url: String
    okta_id: String
    is_deleted: Boolean
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    user(id: ID!): User
    users: [User]
    getme: User
    helloWord: String
  }

  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input UserInput {
    name: String! @constraint(minLength: 5)
    email: String! @constraint(minLength: 5, format: "email")
    dob: String @constraint(minLength: 10)
    phone: String! @constraint(minLength: 10)
    gender: Int
    current_address: String! @constraint(minLength: 10)
    about_me: String! @constraint(minLength: 10)
    role: Int
    img_url: String @constraint(minLength: 10)
    personal_link: String @constraint(minLength: 10)
  }
  input UserCreateInput {
    name: String! @constraint(minLength: 5)
    email: String! @constraint(minLength: 5, format: "email")
    password: String! @constraint(minLength: 6)
  }
  input SigninInput {
    email: String! @constraint(minLength: 5, format: "email")
    password: String! @constraint(minLength: 6)
  }

  # ---------------------------------------------------------
  # Mutations
  # ---------------------------------------------------------
  extend type Mutation {
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
    hardDelUser(id: ID!): User
    signUp(input: UserCreateInput!): String
    signIn(input: SigninInput!): String
    resetPassword(email: String!): String
  }
`;

export default ShopSchema;
