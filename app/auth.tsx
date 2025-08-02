import { useState } from "react";
import { View,KeyboardAvoidingView,Platform,StyleSheet} from "react-native";
import {Button, Text,TextInput,useTheme} from "react-native-paper"
import { useAuthContext } from "@/libs/auth-context";
import { useRouter } from "expo-router";
export default function AuthPage() {
   const route = useRouter()
    const [isSignUp,setIsSignUp] = useState(false);
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [error,setError] = useState<string|null>(null);
    const theme = useTheme();
   const {signIn,signUp} = useAuthContext()
    const ModeSwitchHandler = ()=>{
        setIsSignUp((prev)=>!prev);
    }
    const SignUpHandler = async()=>{
       if(!email||!password){
        setError("Fields required!");
        return;
       }
       setError(null);
       if(isSignUp){
         const error = await signUp(email,password)
         if(error){
            setError(error)
            return;
         }
            return route.replace("/")
       }else{
          const error = await signIn(email,password)
         if(error){
            setError(error)
            return;
         }
            return route.replace("/")
       }
    }
   return(
    <KeyboardAvoidingView
    behavior={Platform.OS==="ios"?"padding":"height"}
    style={styles.layout}
    >
       <View>
        <Text style={{textAlign:"center"}} variant="headlineMedium">{isSignUp?"Create Account ":"Sign In To Account!"}</Text>
        <TextInput
        style={styles.input}
        label="email"
         autoCapitalize="none"
         keyboardType="email-address"
         placeholder="example@gmail.com"
         mode="outlined"
         onChangeText={setEmail}
        />

        <TextInput
        style={styles.input}
        label="password"
        secureTextEntry
        placeholder="password"
        mode="outlined"
        onChangeText={setPassword}
        />
        {error&&(
           <Text style={{color:theme.colors.error}}>{error}</Text>
        )}
        <Button style={styles.button} mode="contained" onPress={SignUpHandler}>{isSignUp?"Sign Up":"Sign In"}</Button>
        <Button mode="text" onPress={ModeSwitchHandler}>{isSignUp?"Already have an account? Sign In!":"Create A New Account! "}</Button>
       </View>
    </KeyboardAvoidingView>
   )
}


const styles = StyleSheet.create({
    layout:{
        flex:1,
        justifyContent:"center",
        gap:"12px",
        padding:12
    },
    input:{
        marginBottom:24,
        padding:5,
    },
    button:{
        padding:5,
    }
})



