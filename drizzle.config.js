/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js", // Path to your schema definition
  dialect: "postgresql", // Specify the PostgreSQL dialect
  dbCredentials: {
    url: "postgresql://ai-interviewer-mocker_owner:2MUptW4mzyQj@ep-cold-hat-a5qlkwvr-pooler.us-east-2.aws.neon.tech/ai-interviewer-mocker?sslmode=require",
  },
};
