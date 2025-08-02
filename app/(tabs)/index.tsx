import { Text, View } from "react-native";
import { useAuthContext } from "@/libs/auth-context";
import { Button } from "react-native-paper";
import { useState } from "react";
export default function Index() {
  const {user,signOut} = useAuthContext();
  const [error,setError] = useState<string|null>(null)
  const [isSignOutLoading,setSignOutLoading] = useState<boolean>(false)
  const HandleSignOut = async()=>{
    setSignOutLoading(true);
    const error = await signOut();
    if(error){
      setError(error)
      setSignOutLoading(false)
    }
     setSignOutLoading(false)
     return null;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{color:"red"}}>Hello! Welcome!</Text>

      {user?<Text>You are Signed In as {user?.email}!</Text>:<Text>You are Signed Out! </Text>}
       {user&&(
        <Button loading={isSignOutLoading?true:false} mode="contained" onPress={() => HandleSignOut()}>
    SignOut?
  </Button>
       )}
    </View>
  );
}
