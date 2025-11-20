import { AuthContext } from "./use-auth-context";
import { db } from "../database/supabase";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";
import { UsersSelect } from "@/types";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined | null>();
  const [userData, setUserData] = useState<UsersSelect | undefined | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the session once, and subscribe to auth state changes
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

      const {
        data: { session },
        error,
      } = await db.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      }

      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", { event: _event, session });
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the profile when the session changes
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      if (session) {
        const { data } = await db
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUserData(data);
      } else {
        setUserData(null);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        userData,
        isLoading,
        isLoggedIn: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
