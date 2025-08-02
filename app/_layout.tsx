import { AuthProvider, useAuthContext } from "@/libs/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user,isUserLoading } = useAuthContext();
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segment[0] === "auth";
    if(isUserLoading){
      return;
    }
    if (!isAuthGroup && !user ) {
      router.replace("/auth");
    } else if (isAuthGroup && user) {
      router.replace("/");
    }
  }, [user, segment,isUserLoading]);
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </AuthProvider>
    </>
  );
}
