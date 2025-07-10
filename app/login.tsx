// App.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/constants/firebase";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
    User,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
        iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
        androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
        webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential).catch((err) =>
                Alert.alert("Firebase Sign-In Error", err.message),
            );
        }
    }, [response]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            Alert.alert("Sign Out Error", (err as Error).message);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.text}>
                        Welcome, {user.displayName || user.email}
                    </Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Button
                    title="Login with Google"
                    disabled={!request}
                    onPress={() => promptAsync()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: { fontSize: 20, marginBottom: 20, textAlign: "center" },
});
