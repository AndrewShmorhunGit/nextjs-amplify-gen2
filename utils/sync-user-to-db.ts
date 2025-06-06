"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

/**
 * Sync user to database (Amplify Data) if not already present
 */
export async function syncUserToDB(email: string, preferredUsername: string) {
  try {
    const { data: existing } = await client.models.User.list({
      filter: { email: { eq: email } },
    });

    if (!existing.length) {
      await client.models.User.create(
        {
          name: preferredUsername,
          email,
          role: "user",
        },
        {
          condition: {
            email: { ne: email }, // only create if not exists
          },
        }
      );
      console.log("✅ User has been created in the database");
    } else {
      console.log("ℹ️ User already exists in the database");
    }
  } catch (error) {
    console.error("❌ Failed to sync user to the database:", error);
  }
}
