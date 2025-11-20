import { useAuthContext } from "../../auth/use-auth-context";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      // Hide the splash screen once loading is complete
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return null;
}
