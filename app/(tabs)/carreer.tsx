import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, LockIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ScrollView } from "react-native";

export default function Profile() {
    let name: string = "Emiliano Hinojosa Guzman";
    let email: string = "0252496@up.edu.mx";
    let password: string = "***********";

    let career: string = "Computer Systems Engineering";
    let career_start_date: string = "Aug 2022";
    let career_end_date: string = "June 2027";
    let career_status: string = "Enrolled";

    return (
        <ScrollView>
            <VStack space="2xl" className="mt-10">
                <Heading size="2xl" className="text-center">
                    Profile
                </Heading>

                <VStack space="xs">
                    <Heading className="text-center">Full Name</Heading>
                    <Text className="text-center bg-up-blue text-white rounded-full py-2">
                        {name}
                    </Text>
                </VStack>

                <VStack space="xs">
                    <Heading className="text-center">
                        Institutional Email
                    </Heading>
                    <Text className="text-center bg-up-blue text-white rounded-full py-2">
                        {email}
                    </Text>
                </VStack>

                <VStack space="xs">
                    <Heading className="text-center">Password</Heading>
                    <Text className="text-center bg-up-blue text-white rounded-full py-2">
                        {password}
                    </Text>
                </VStack>

                <VStack space="xs">
                    <Button className="bg-up-red rounded-full">
                        <ButtonText>Change Password</ButtonText>
                        <ButtonIcon as={EyeIcon}></ButtonIcon>
                    </Button>

                    <Button className="bg-up-red rounded-3xl">
                        <ButtonText>Sign Out</ButtonText>
                        <ButtonIcon as={LockIcon}></ButtonIcon>
                    </Button>
                </VStack>

                <Card className="bg-up-gold rounded-3xl">
                    <Center>
                        <VStack space="md">
                            <VStack space="xs">
                                <Heading
                                    size="md"
                                    className="text-up-white text-center"
                                >
                                    Carreer
                                </Heading>
                                <Text className="text-black bg-up-white text-center rounded-full px-4">
                                    {career}
                                </Text>
                            </VStack>

                            <VStack space="xs">
                                <Heading
                                    size="md"
                                    className="text-up-white text-center"
                                >
                                    Start Date
                                </Heading>
                                <Text className="text-black bg-up-white text-center rounded-full px-4">
                                    {career_start_date}
                                </Text>
                            </VStack>

                            <VStack space="xs">
                                <Heading
                                    size="md"
                                    className="text-up-white text-center"
                                >
                                    End Date
                                </Heading>
                                <Text className="text-black bg-up-white text-center rounded-full px-4">
                                    {career_end_date}
                                </Text>
                            </VStack>

                            <VStack space="xs">
                                <Heading
                                    size="md"
                                    className="text-up-white text-center"
                                >
                                    Status
                                </Heading>
                                <Text className="text-black bg-up-white text-center rounded-full px-4">
                                    {career_status}
                                </Text>
                            </VStack>
                        </VStack>
                    </Center>
                </Card>
            </VStack>
        </ScrollView>
    );
}
