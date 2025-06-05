import {
  cookiesClient,
  AuthGetCurrentUserServer,
  runWithAmplifyServerContext,
} from "@/utils/amplify-utils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export default async function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthGetCurrentUserServer();

  if (user) {
    const { username, signInDetails } = user;
    const email = signInDetails?.loginId ?? `${username}@unknown`;

    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens?.idToken?.payload["preferred_username"];
      },
    });

    const preferredUsername = session || username;

    const { data: existing } = await cookiesClient.models.User.list({
      filter: {
        email: { eq: email },
      },
    });

    if (!existing.length) {
      await cookiesClient.models.User.create({
        name: preferredUsername,
        email,
        role: "user",
      });
      console.log("✅ User записан с preferredUsername в модель.");
    }
  }

  return <>{children}</>;
}
