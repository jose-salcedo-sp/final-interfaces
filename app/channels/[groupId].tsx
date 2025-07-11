import { HStack } from "@/components/ui/hstack/index";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { SendIcon } from "lucide-react-native";
import { auth, db } from "@/constants/firebase";
import { ref, onValue, push, serverTimestamp, off } from "firebase/database";
import { useLocalSearchParams } from "expo-router"; // ✅ for getting route params

type Message = {
    id: string;
    text: string;
    senderEmail: string;
    senderName: string;
    senderId: string;
};

export default function Channels() {
    const { groupId } = useLocalSearchParams(); // ✅ get groupId from route /channels/[groupId]
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (!groupId) return; // ⚠️ block if no groupId

        const groupMessagesRef = ref(db, `groups/${groupId}/messages`);
        const usersRef = ref(db, "users");

        let userData: Record<string, any> = {};

        const usersUnsub = onValue(usersRef, (snap) => {
            userData = snap.val() || {};
        });

        const messagesUnsub = onValue(groupMessagesRef, (snap) => {
            const msgData = snap.val() || {};

            const loadedMessages = Object.entries(msgData).map(
                ([id, value]: [string, any]) => ({
                    id,
                    text: value.text,
                    senderEmail: value.senderEmail,
                    senderId: value.senderId,
                    senderName: userData[value.senderId]?.fullName || "Unknown",
                }),
            );

            setMessages(loadedMessages);

            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });

        return () => {
            off(usersRef);
            off(groupMessagesRef);
        };
    }, [groupId]);

    async function sendMessage() {
        if (!groupId) {
            alert("No group selected.");
            return;
        }

        if (msg.trim() === "") return;

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to send messages.");
            return;
        }

        const groupMessagesRef = ref(db, `groups/${groupId}/messages`);

        await push(groupMessagesRef, {
            text: msg,
            createdAt: serverTimestamp(),
            senderId: user.uid,
            senderEmail: user.email,
        });

        setMsg("");
    }

    return (
        <SafeAreaView>
            <VStack className="w-full flex-1 px-2">
                {groupId ? (
                    <>
                        <ScrollView
                            ref={scrollRef}
                            className="flex-1 mb-2 w-full"
                            contentContainerStyle={{ paddingVertical: 10 }}
                        >
                            {messages.map((m) => {
                                const isOwnMessage =
                                    m.senderEmail === auth.currentUser?.email;

                                return (
                                    <VStack
                                        key={m.id}
                                        className={`my-1 w-full ${
                                            isOwnMessage
                                                ? "items-end"
                                                : "items-start"
                                        }`}
                                    >
                                        {!isOwnMessage && (
                                            <Text className="text-xs text-gray-500">
                                                {m.senderName}
                                            </Text>
                                        )}
                                        <Text
                                            className={`p-2 rounded-lg text-white max-w-[70%] ${
                                                isOwnMessage
                                                    ? "bg-up-blue"
                                                    : "bg-up-gold"
                                            }`}
                                        >
                                            {m.text}
                                        </Text>
                                    </VStack>
                                );
                            })}
                        </ScrollView>

                        <HStack className="items-center w-full py-2" space="md">
                            <Input
                                variant="outline"
                                size="md"
                                className="rounded-3xl flex-1"
                            >
                                <InputField
                                    placeholder="Enter your message here..."
                                    type="text"
                                    value={msg}
                                    onChangeText={setMsg}
                                />
                            </Input>
                            <Button
                                onPress={sendMessage}
                                className="rounded-full bg-up-red"
                            >
                                <ButtonIcon as={SendIcon} />
                            </Button>
                        </HStack>
                    </>
                ) : (
                    <VStack className="flex-1 justify-center items-center">
                        <Text className="text-lg text-gray-500">
                            No group selected.
                        </Text>
                    </VStack>
                )}
            </VStack>
        </SafeAreaView>
    );
}
