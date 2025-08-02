import { View,Text } from "react-native"
import { StyleSheet } from "react-native"
export default function Aboutus(){
    return(
      <View style={styles.view}>
        <Text>About Us Pag</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    view:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})