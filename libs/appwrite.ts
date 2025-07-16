import { Client,Account} from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_PROJECT_KEY!)
  .setPlatform(process.env.EXPO_PUBLIC_PLATFORM_NAME!);

export const account =new Account(client);
