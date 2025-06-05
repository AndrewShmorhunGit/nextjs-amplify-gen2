"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { setUser } from "@/app/redux/slices/user.slice";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAppDispatch } from "@/app/redux/store.hooks";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      if (authStatus === "authenticated" && user) {
        try {
          const attributes = await fetchUserAttributes();
          dispatch(
            setUser({
              username: user.username,
              email: attributes.email,
              preferredUsername: attributes.preferred_username,
            })
          );
        } catch (error) {
          console.error("Failed to fetch user attributes:", error);
        }
      }
    };

    loadUser();
  }, [authStatus, user]);

  return <>{children}</>;
}
