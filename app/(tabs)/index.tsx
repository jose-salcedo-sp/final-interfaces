import { auth } from "@/constants/firebase";
import { router } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    async function signOut() {
        await auth.signOut();
        console.log(auth)
        router.replace("/(tabs)/explore");
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={signOut}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
