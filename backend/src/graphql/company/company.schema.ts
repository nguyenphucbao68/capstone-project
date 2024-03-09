import { gql } from "apollo-server-express";
const CompanySchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type CompanyPayload {
    id: Int!
    company_name: String!
    company_type: String
    country: String
    working_day: String
    ot_policy: String
    company_size: String
    overview: String
    company_website: String
    company_facebook: String
    brief_overview: String
  }

  type CompanyReview {
    id: Int!
    company_id: Int!
    user_id: Int!
    summary: String!
    ot_satisfy_reason: String
    input_experience: String
    input_improvement_suggestion: String
    is_recommended: Boolean
    ot_satisfy: Boolean
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    companies: [CompanyPayload!]
    company(id: Int!): CompanyPayload
    companyReviews: [CompanyReview!]
    companyReview(id: Int!): CompanyReview
  }
  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------

  input CompanyInput {
    company_name: String!
    company_type: String!
    country: String!
    working_day: String
    ot_policy: String!
    company_size: String!
    overview: String @constraint(minLength: 10, maxLength: 80)
    company_website: String
    company_facebook: String
    brief_overview: String @constraint(minLength: 1, maxLength: 80)
  }

  input CompanyReviewInput {
    company_id: Int!
    user_id: Int!
    summary: String! @constraint(minLength: 10, maxLength: 80)
    ot_satisfy_reason: String @constraint(minLength: 50, maxLength: 140)
    input_experience: String @constraint(minLength: 50, maxLength: 10000)
    input_improvement_suggestion: String
      @constraint(minLength: 50, maxLength: 10000)
    is_recommended: Boolean!
    ot_satisfy: Boolean!
  }
  input UpdateCompanyReviewInput {
    summary: String! @constraint(minLength: 10, maxLength: 80)
    ot_satisfy_reason: String @constraint(minLength: 50, maxLength: 140)
    input_experience: String @constraint(minLength: 50, maxLength: 10000)
    input_improvement_suggestion: String
      @constraint(minLength: 50, maxLength: 10000)
    is_recommended: Boolean
    ot_satisfy: Boolean
  }
  # ---------------------------------------------------------
  # Mutations
  # --------------------------------------------------------

  extend type Mutation {
    createCompany(input: CompanyInput!): CompanyPayload
    updateCompany(id: Int!, input: CompanyInput!): CompanyPayload
    deleteCompany(id: Int!): CompanyPayload
    createCompanyReview(input: CompanyReviewInput!): CompanyReview!
    updateCompanyReview(
      id: Int!
      input: UpdateCompanyReviewInput!
    ): CompanyReview!
    deleteCompanyReview(id: Int!): CompanyReview!
  }
`;

export default CompanySchema;
