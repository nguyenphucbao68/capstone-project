import {gql} from 'apollo-server-express';
const BlogSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type BlogPayload {
    id: ID!
    user_id: Int!
    create_at: String!
    content: String!
    time_read: Int!
    title: String!
  }
    # ---------------------------------------------------------
    # Queries
    # ---------------------------------------------------------
    extend type Query {
        blogs: [BlogPayload!]
        blog(id: ID!): BlogPayload
    }
    # ---------------------------------------------------------
    # Input Objects
    # ---------------------------------------------------------
    input BlogInput {
        user_id: Int!
        created_at: String! @constraint(minLength: 10, format: "date")
        content: String! @constraint(minLength: 5)
        time_read: Int!
        title: String! @constraint(minLength: 5)
    }
    # ---------------------------------------------------------
    # Mutations
    # ---------------------------------------------------------
    extend type Mutation {
        createBlog(input: BlogInput!): BlogPayload
        updateBlog(id: ID!, input: BlogInput!): BlogPayload!
        deleteBlog(id: ID!): BlogPayload!
    }
`;
export default BlogSchema;