import { HStack } from "@/components/ui/hstack/index";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { SendIcon } from "lucide-react-native";
import { auth, db } from "@/constants/firebase";
import { ref, onValue, push, serverTimestamp } from "firebase/database";

type Message = {
    id: string;
    text: string;
    senderEmail: string;
    senderName: string;
};

export default function Channels() {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<ScrollView>(null);

    console.log(messages);

    useEffect(() => {
        const messagesRef = ref(db, "messages");
        const usersRef = ref(db, "users");

        let unsubscribeMessages: any;
        let unsubscribeUsers: any;

        // First, load users table
        unsubscribeUsers = onValue(usersRef, (userSnap) => {
            const userData = userSnap.val() || {};

            console.log(userData)

            // Then, listen to messages
            unsubscribeMessages = onValue(messagesRef, (msgSnap) => {
                const msgData = msgSnap.val() || {};

                const loadedMessages = Object.entries(msgData).map(
                    ([id, value]: [string, any]) => ({
                        id,
                        text: value.text,
                        senderEmail: value.senderEmail,
                        senderId: value.senderId,
                        senderName:
                            userData[value.senderId]?.fullName || "Unknown",
                    }),
                );

                setMessages(loadedMessages);

                // Auto scroll to bottom on new message
                setTimeout(() => {
                    scrollRef.current?.scrollToEnd({ animated: true });
                }, 100);
            });
        });

        return () => {
            if (unsubscribeMessages) unsubscribeMessages();
            if (unsubscribeUsers) unsubscribeUsers();
        };
    }, []);

    async function sendMessage() {
        if (msg.trim() === "") return;

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to send messages.");
            return;
        }

        const messagesRef = ref(db, "messages");

        await push(messagesRef, {
            text: msg,
            createdAt: serverTimestamp(),
            senderId: user.uid,
            senderEmail: user.email,
        });

        setMsg("");
    }

    return (
        <VStack className="w-full px-2 h-[90%]">
            <ScrollView ref={scrollRef} className="flex flex-1 mb-2 w-full">
                {messages.map((m) => {
                    const isOwnMessage =
                        m.senderEmail === auth.currentUser?.email;

                    return (
                        <VStack
                            key={m.id}
                            className={`my-1 w-full ${isOwnMessage ? "items-end" : "items-start"}`}
                        >
                            <Text className="text-xs text-gray-500">
                                {m.senderName}
                            </Text>
                            <Text
                                className={`p-2 rounded-lg text-white max-w-[70%] ${
                                    isOwnMessage ? "bg-up-blue" : "bg-up-gold"
                                }`}
                            >
                                {m.text}
                            </Text>
                        </VStack>
                    );
                })}
            </ScrollView>

            <HStack className="items-center h-[8%] w-full" space="md">
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
        </VStack>
    );
}
