import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar />
            {/* Tabs fill remaining space */}
            <Box style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor:
                            Colors[colorScheme ?? "light"].tint,
                        headerShown: false,
                        tabBarButton: HapticTab,
                        tabBarBackground: TabBarBackground,
                        tabBarStyle: Platform.select({
                            ios: { position: "absolute" },
                            default: {},
                        }),
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color }) => (
                                <IconSymbol
                                    size={28}
                                    name="house.fill"
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="channels"
                        options={{
                            title: "Channels",
                            tabBarIcon: ({ color }) => (
                                <IconSymbol
                                    size={28}
                                    name="message.and.waveform"
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </Box>
        </SafeAreaView>
    );
}
