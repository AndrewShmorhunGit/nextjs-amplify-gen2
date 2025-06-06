"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useRef } from "react";
import { setUser } from "@/app/redux/slices/user.slice";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAppDispatch } from "@/app/redux/store.hooks";
import { syncUserToDB } from "@/utils/sync-user-to-db";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);
  const dispatch = useAppDispatch();

  const hasSyncedRef = useRef(false); // 🛑 prevent duplicate syncs
  /* We Emailed You
Your code is on the way. To log in, enter the code we emailed to a***@g***. It may take a minute to arrive. */

  useEffect(() => {
    const loadUser = async () => {
      if (authStatus === "authenticated" && user && !hasSyncedRef.current) {
        hasSyncedRef.current = true; // 🔒 lock once called

        try {
          const attributes = await fetchUserAttributes();

          const username = user.username;
          const email = attributes.email ?? `${username}@unknown`;
          const preferredUsername = attributes.preferred_username ?? username;

          dispatch(setUser({ username, email, preferredUsername }));

          await syncUserToDB(email, preferredUsername);
        } catch (error) {
          console.error("❌ Failed to process authenticated user:", error);
        }
      }
    };

    loadUser();
  }, [authStatus, user, dispatch]);

  return <>{children}</>;
}
