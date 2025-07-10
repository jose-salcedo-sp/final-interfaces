import { Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/constants/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signIn() {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (user) router.replace("/(tabs)");
        } catch (err: any) {
            console.error(err);
            alert("Sign in failed: " + err.message);
        }
    }

    async function signUp() {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (user) router.replace("/(tabs)");
        } catch (err: any) {
            console.error(err);
            alert("Sign in failed: " + err.message);
        }
    }

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
        iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
        androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
        webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/(tabs)");
            } else {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential).catch((err) => {
                console.error("Firebase signInWithCredential error:", err);
                alert("Google Sign-In failed: " + err.message);
            });
        }
    }, [response]);

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="password"
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={signIn}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp}>
                <Text>Make account</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TouchableOpacity
                onPress={() => promptAsync()}
                style={{
                    backgroundColor: "#4285F4",
                    padding: 12,
                    borderRadius: 5,
                    alignItems: "center",
                }}
                disabled={!request}
            >
                <Text style={{ color: "white", fontSize: 16 }}>
                    Login with Google
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
