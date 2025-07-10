import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/constants/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
} from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { LogInIcon } from "lucide-react-native";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setIsLoading] = useState(false);

    function setEmailWithValidation(email: string) {
        setEmail(email);
        if (!email.endsWith("@up.edu.mx"))
            setEmailError("Must use institutional '@up.edu.mx' account!");
        else setEmailError("");
    }

    function setPasswordWithValidation(password: string) {
        setPassword(password);
        if (password.length < 6)
            setPasswordError("Password must be at least 6 characters long!");
        else setPasswordError("");
    }

    async function signIn() {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    async function signUp() {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    return (
        <SafeAreaView>
            <Box className="flex h-full justify-center items-center">
                <Image
                    size="2xl"
                    source={require("../assets/images/uparbolito.png")}
                    alt="UP Arbolito"
                />
                <VStack space="lg" className="w-2/3">
                    <Center>
                        <Box className="relative h-28 w-[260px]">
                            <Heading size="5xl">WELCOME</Heading>
                            <Heading
                                size="4xl"
                                className="absolute left-0 bottom-0"
                            >
                                To
                            </Heading>
                            <Heading
                                size="4xl"
                                className="text-up-gold font-extrabold absolute right-0 bottom-0"
                            >
                                ChatUP
                            </Heading>
                        </Box>
                    </Center>

                    <VStack space="sm">
                        <Input
                            variant="outline"
                            size="md"
                            className="rounded-3xl"
                        >
                            <InputField
                                placeholder="Enter your email here..."
                                value={email}
                                onChangeText={setEmailWithValidation}
                            />
                        </Input>
                        {emailError !== "" && (
                            <Text className="text-red-500 font-bold">
                                {emailError}
                            </Text>
                        )}
                    </VStack>

                    <VStack space="sm">
                        <Input
                            variant="outline"
                            size="md"
                            className="rounded-3xl"
                        >
                            <InputField
                                placeholder="Enter your password here..."
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChangeText={setPasswordWithValidation}
                            />
                            <InputSlot
                                onPress={() => setShowPassword(!showPassword)}
                                className="px-2"
                            >
                                <InputIcon
                                    as={showPassword ? EyeOffIcon : EyeIcon}
                                    size="md"
                                />
                            </InputSlot>
                        </Input>
                        {passwordError !== "" && (
                            <Text className="text-red-500 font-bold">
                                {passwordError}
                            </Text>
                        )}
                    </VStack>

                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        onPress={signIn}
                        className="rounded-3xl bg-up-blue"
                    >
                        {loading && <ButtonSpinner className="text-gray-500" />}
                        <ButtonText>Login</ButtonText>
                        <ButtonIcon as={LogInIcon} />
                    </Button>

                    <VStack space="md" className="items-center mt-12">
                        <Text size="xl">{"Don't have an account yet?"}</Text>
                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            onPress={() => router.replace("/register")}
                            className="rounded-3xl bg-up-blue w-full"
                        >
                            <ButtonText>Register</ButtonText>
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
