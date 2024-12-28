import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Initialize the Neon client with the database URL
const sql = neon(
  "postgresql://ai-interviewer-mocker_owner:2MUptW4mzyQj@ep-cold-hat-a5qlkwvr-pooler.us-east-2.aws.neon.tech/ai-interviewer-mocker?sslmode=require"
);

// Initialize Drizzle ORM with the Neon client and schema
export const db = drizzle(sql, { schema });
