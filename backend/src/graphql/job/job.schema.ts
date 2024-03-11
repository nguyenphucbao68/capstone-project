import { gql } from "apollo-server-express";

const JobSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------

  #job
  type JobWorkingLocation {
    id: ID!
    company_location: CompanyLocation
  }

  type CompanyLocation {
    address: String
  }

  type JobPayLoad {
    id: ID!
    name: String!
    salary_from: Int
    salary_to: Int
    unit: String
    hide_salary: Boolean
    country: String
    skills: String!
    working_type: String!
    top_3_reason: String!
    job_description: String
    skill_demand: String!
    why_you_love_working_here: String!
    date_posted: Date!
    # date_apply: Date!
    is_closed: Boolean!
    job_working_location: [JobWorkingLocation!]
  }
  #job_apply_description
  type Applicant {
    id: ID!
    name: String!
    email: String!
    img_url: String!
  }
  type Job {
    id: ID!
    name: String!
  }
  type JobApplication {
    id: ID!
    cv: String!
    cover_letter: String
    date_apply: Date!
    status: String!
    job: Job!
    user: Applicant!
  }
  #applying_job
  type JobApplying {
    id: ID!
    cv: String!
    cover_letter: String
    date_apply: Date!
    status: String!
    job_id: ID!
    user_id: ID!
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    jobApplications: [JobApplication!]
    jobApplication(id: ID!): JobApplication
    companyJobApplications(companyId: ID!): [JobApplication!]!
    job(id: ID!): JobPayLoad

    jobs: [JobPayLoad!]
  }
  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input ApplyJobInput {
    user_id: ID!
    job_id: ID!
    cv: String! @constraint(minLength: 1)
    cover_letter: String
  }
  input JobInput {
    name: String!
    salary_from: Int
    salary_to: Int
    unit: String
    hide_salary: Boolean
    country: String!
    skills: String!
    working_type: String!
    top_3_reason: String!
    job_description: String!
    skill_demand: String!
    why_you_love_working_here: String!
    company_id: ID!
    is_closed: Boolean!
  }
  input updateJobInput {
    name: String!
    salary_from: Int
    salary_to: Int
    unit: String
    hide_salary: Boolean
    country: String!
    skills: String!
    working_type: String!
    top_3_reason: String!
    job_description: String!
    skill_demand: String!
    why_you_love_working_here: String!
    is_closed: Boolean!
  }
  input updateJobApplication {
    status: String!
  }
  # ---------------------------------------------------------
  # Mutations
  # --------------------------------------------------------

  extend type Mutation {
    applyJob(input: ApplyJobInput!): JobApplying!
    updateJobApplication(id: ID!, input: updateJobApplication): JobApplication!
    createJob(input: JobInput): JobPayLoad!
    updateJob(id: ID!, input: updateJobInput): JobPayLoad!
    deleteJob(id: ID!): JobPayLoad!
  }
`;

export default JobSchema;
