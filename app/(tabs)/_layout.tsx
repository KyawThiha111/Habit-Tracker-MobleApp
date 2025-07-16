import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home Page",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="login" options={{title:"Login Page",tabBarIcon:({focused,color})=>{return focused?(<FontAwesome6 name="user-check" size={24} color={color} />):(<FontAwesome6 name="user-xmark" size={24} color={color} />)}}}/>
      </Tabs>
    </>
  );
}
