import { Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/constants/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import { Input, InputField } from "@/components/ui/input";

export default function Login() {
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

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField placeholder="Enter Text here..." />
            </Input>
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
