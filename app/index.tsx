import { auth } from "@/constants/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
            console.log(user);
            if (user) router.replace("/(tabs)");
        } catch (err: any) {
            console.error(err);
            alert("Sign in failed: " + err.message);
            router.replace("/(tabs)"); //DELETE
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
        </SafeAreaView>
    );
}
