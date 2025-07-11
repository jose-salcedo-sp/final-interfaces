import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { CirclePlusIcon } from "lucide-react-native";
import { auth, db } from "@/constants/firebase";
import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { router } from "expo-router";

type Group = {
    name: string;
    id: string;
    createdBy: string;
};

export default function Groups() {
    const [groupName, setGroupName] = useState("");
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const groupsRef = ref(db, "groups");

        const unsubscribe = onValue(groupsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const loadedGroups = Object.entries(data).map(
                ([id, value]: [string, any]) => ({
                    id,
                    name: value.name,
                    createdBy: value.createdBy,
                }),
            );
            setGroups(loadedGroups);
        });

        return () => unsubscribe();
    }, []);

    async function createGroup() {
        if (groupName.trim() === "") {
            Alert.alert("Group name is required.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert("You must be logged in to create a group.");
            return;
        }

        try {
            const groupsRef = ref(db, "groups");
            const newGroupRef = push(groupsRef);
            await set(newGroupRef, {
                name: groupName.trim(),
                createdAt: new Date().toISOString(),
                createdBy: user.email || user.uid, // ✅ store email or UID
            });

            setGroupName("");
        } catch (error) {
            console.error("Failed to create group:", error);
            Alert.alert("Error", "Could not create group.");
        }
    }

    return (
        <ScrollView>
            <VStack space="2xl" className="mt-10 px-2">
                <Heading size="2xl" className="text-center">
                    Groups
                </Heading>

                <Heading size="lg" className="text-start">
                    Create new group
                </Heading>

                <HStack className="items-center w-full" space="md">
                    <Input
                        variant="outline"
                        size="md"
                        className="rounded-3xl flex-1"
                    >
                        <InputField
                            placeholder="Enter group name..."
                            type="text"
                            value={groupName}
                            onChangeText={setGroupName}
                        />
                    </Input>
                    <Button
                        onPress={createGroup}
                        className="rounded-full bg-up-red"
                    >
                        <ButtonIcon as={CirclePlusIcon} />
                    </Button>
                </HStack>

                <Heading size="lg" className="text-start">
                    Community Groups
                </Heading>

                <VStack space="md">
                    {groups.map((group) => (
                        <Button
                            key={group.id}
                            variant="outline"
                            className="justify-start"
                            onPress={() => {
                                Alert.alert(`Selected group: ${group.name}`);
                                router.push(`/channels/${group.id}`);
                            }}
                        >
                            <Text>{group.name}</Text>
                        </Button>
                    ))}
                </VStack>
            </VStack>
        </ScrollView>
    );
}
