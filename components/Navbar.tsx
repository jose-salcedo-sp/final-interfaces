import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { router } from "expo-router";
import { useState } from "react";
import { Box } from "./ui/box";
import { Button, ButtonIcon } from "./ui/button";
import { MenuIcon } from "./ui/icon";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type MenuRoute = {
    name: string;
    route: string;
};

const menu_routes: MenuRoute[] = [
    {
        name: "Profile",
        route: "/(tabs)/profile",
    },
    {
        name: "UP Chat",
        route: "/(tabs)/upchat",
    },
    {
        name: "Career & Path",
        route: "/(tabs)/career",
    },
    {
        name: "Finance",
        route: "/(tabs)/finance",
    },
    {
        name: "Grades",
        route: "/(tabs)/grades",
    },
    {
        name: "Groups",
        route: "/(tabs)/channels",
    },
];

export default function Navbar() {
    const [showActionsheet, setShowActionsheet] = useState(false);
    function handleClose(route: string) {
        return () => {
            setShowActionsheet(false);
            router.navigate(route as any);
        };
    }

    return (
        <>
            <Actionsheet
                isOpen={showActionsheet}
                onClose={() => setShowActionsheet(false)}
            >
                <ActionsheetBackdrop />

                <ActionsheetContent>
                    <ActionsheetItem>
                        <ActionsheetItemText className="font-extrabold">
                            Sign out
                        </ActionsheetItemText>
                    </ActionsheetItem>

                    {menu_routes.map((route, key) => (
                        <ActionsheetItem
                            key={key}
                            onPress={handleClose(route.route)}
                        >
                            <ActionsheetItemText>
                                {route.name}
                            </ActionsheetItemText>
                        </ActionsheetItem>
                    ))}
                </ActionsheetContent>
            </Actionsheet>

            <Box className="w-full h-[10%] bg-up-red flex flex-row items-center px-2">
                <Box className="flex justify-start items-center">
                    <Text size="2xl" className="text-white font-semibold">
                        UP Chat
                    </Text>
                </Box>
                <Box className="flex flex-grow" />
                <VStack space="md">
                    <Button
                        variant="solid"
                        className="bg-transparent"
                        onPress={() => setShowActionsheet(true)}
                    >
                        <ButtonIcon
                            as={MenuIcon}
                            size="xl"
                            className="text-white"
                        />
                    </Button>
                </VStack>
            </Box>
        </>
    );
}
