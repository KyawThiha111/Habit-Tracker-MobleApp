import { createContext, useContext, useEffect, useState } from "react"
import {ID, Models} from "react-native-appwrite"
import { account } from "./appwrite";
type AuthContextType = {
    user:Models.User<Models.Preferences>|null;//From AppWrite
    isUserLoading:Boolean;
   // isSignOutLoadng:Boolean;
    signUp:(email:string,password:string)=>Promise<string|null>;
    signIn:(email:string,password:string)=>Promise<string|null>;
    signOut:()=>Promise<string|null>
}
const AuthContext = createContext<AuthContextType|undefined>(undefined);
export function AuthProvider({children}:{children:React.ReactNode}){
  
    const [user,setUser] = useState<Models.User<Models.Preferences>|null>(null);
   const [isUserLoading,setUserLoading] = useState<Boolean>(true);
//const [isSignOutLoading,setSignOutLoading] = useState<Boolean>(false)
   useEffect(()=>{
        GetUser()
    },[])
   const GetUser = async()=>{
     try {
         const session = await account.get();
         setUser(session)
     } catch (error) {
         setUser(null)
     } finally {
        setUserLoading(false)
     }
   }
    const signUp = async(email:string,password:string)=>{
     try {
        const id = ID.unique();
         await account.create(id,email,password)
         await signIn(email,password)
         return null;
     } catch (error) {
        if(error instanceof Error){
            return error.message
        }
        return "An error occured during singup!"
     }
   }
   const signIn = async(email:string,password:string)=>{
     try {
         await account.createEmailPasswordSession(email,password)
         await GetUser()
         return null;
     } catch (error) {
        if(error instanceof Error){
            return error.message
        }
        return "An error occured during singin!"
     }
   }
   const signOut = async()=>{
    try {
          await account.deleteSession("current");
          alert("Sign Out")
          setUser(null);
          return null;
    } catch (error) {
          if(error instanceof Error){
            return error.message
          }
          return "Error while sign out!"
    }
   }
   return <>
    <AuthContext.Provider value={{signUp,signIn,signOut,user,isUserLoading}}>
        {children}
    </AuthContext.Provider>
    </>
}

export function useAuthContext(){
    const context = useContext(AuthContext);
    if(context===undefined){
        throw new Error("useAuth must be inside of a AuthProvider!")
    }
    return context
}