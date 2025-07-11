import { HStack } from "@/components/ui/hstack/index";
import { Input, InputField } from "@/components/ui/input";
import { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { SendIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

export default function AIChat() {
    const [msg, setMsg] = useState("");

    return (
        <VStack className="w-full px-2 h-[90%]">
            <Box className="flex flex-1 mt-10 w-full justify-center items-center">
                <Text className="text-2xl font-semibold text-center w-2/3">
                    Welcome to Universidad Panamericana <Text className="text-2xl font-extrabold">AI assistant!</Text>
                </Text>
            </Box>

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
                <Button onPress={() => {}} className="rounded-full bg-up-red">
                    <ButtonIcon as={SendIcon} />
                </Button>
            </HStack>
        </VStack>
    );
}
