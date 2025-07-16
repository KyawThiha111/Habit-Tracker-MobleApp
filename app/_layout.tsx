import { useEffect, useState } from "react";
import { useRouter,Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "@/libs/auth-context";
function RouteGuard({children}:{children:React.ReactNode}){
  const isAuth = false;
  const router = useRouter();
   useEffect(()=>{
    if(!isAuth){
      router.replace("/auth")
    }
   })

   return <>{children}</>
}
export default function RootLayout() {
  return(
<>
  <AuthProvider>
    <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
  </Stack>
  </AuthProvider>
 </>
  );
}

