import { Card } from "@/components/ui/card";
import { Center } from '@/components/ui/center';
import { Heading } from "@/components/ui/heading";
import { Text } from '@/components/ui/text';
import { VStack } from "@/components/ui/vstack";

import { router } from "expo-router";

import React from "react";
import { Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    let name:string = "Emiliano!";
    let email:string = "0252496@up.edu.mx";
    let password:string = "***********";

    let career:string = "Computer Systems Engineering";
    let career_start_date:string = "Aug 2022";
    let career_end_date:string = "June 2027";
    let career_status:string = "Enrolled";

  return (
    <SafeAreaView>
        <Center>
            <VStack space='2xl' className='mt-10'>
                <Heading size="2xl" className="text-center">Welcome, {name}</Heading>
                
                <Pressable onPressOut={() => router.replace("/(tabs)/channels")}>
                    <Card className="bg-up-gold rounded-3xl min-h-24 flex flex-row items-center mx-5">
                        <Heading size="xl" className="text-up-white text-center w-5/12">UP Chat</Heading>
                        <Text className="text-black bg-up-white text-center rounded-3xl py-6 w-7/12">Get instant answers</Text>
                    </Card>
                </Pressable>

                <Pressable onPressOut={() => router.replace("/(tabs)/profile")}>
                    <Card className="bg-up-blue rounded-3xl min-h-24 flex flex-row items-center mx-5">
                        <Heading size="xl" className="text-up-white text-center w-5/12">Profile</Heading>
                        <Text className="text-black bg-up-white text-center rounded-3xl py-6 w-7/12">View/edit your details</Text>
                    </Card>
                </Pressable>

                <Pressable onPressOut={() => router.replace("/(tabs)/carreer")}>
                    <Card className="bg-up-blue rounded-3xl min-h-24 flex flex-row items-center mx-5">
                        <Heading size="xl" className="text-up-white text-center w-5/12">Carrer</Heading>
                        <Text className="text-black bg-up-white text-center rounded-3xl py-6 w-7/12">Explore your career path</Text>
                    </Card>
                </Pressable>
                
                <Pressable onPressOut={() => router.replace("/(tabs)/finance")}>
                    <Card className="bg-up-blue rounded-3xl min-h-24 flex flex-row items-center mx-5">
                        <Heading size="xl" className="text-up-white text-center w-5/12">Finance</Heading>
                        <Text className="text-black bg-up-white text-center rounded-3xl py-6 w-7/12">Manage tuition/fees</Text>
                    </Card>
                </Pressable>

                <Pressable onPressOut={() => router.replace("/(tabs)/grades")}>
                    <Card className="bg-up-blue rounded-3xl min-h-24 flex flex-row items-center mx-5">
                        <Heading size="xl" className="text-up-white text-center w-5/12">Grades</Heading>
                        <Text className="text-black bg-up-white text-center rounded-3xl py-6 w-7/12">Check academic progress</Text>
                    </Card>
                </Pressable>

            </VStack>
        </Center>
    </SafeAreaView>

  );
}
