import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

export default function Profile() {
    let balance = 345.67
    let due_date = "14/07/2025"

const account_movements = [
  { date: "2024-05-15", amount: 1500.00, concept: "Payment" },
  { date: "2024-05-16", amount: -250.50, concept: "Charge" },
  { date: "2024-05-17", amount: -1200.00, concept: "Charge" },
  { date: "2024-05-18", amount: 500.00, concept: "Payment" },
  { date: "2024-05-19", amount: -75.30, concept: "Charge" },
  { date: "2024-05-20", amount: -45.99, concept: "Charge" },
  { date: "2024-05-21", amount: 300.00, concept: "Payment" },
  { date: "2024-05-22", amount: -60.00, concept: "Charge" },
  { date: "2024-05-23", amount: -350.00, concept: "Charge" },
  { date: "2024-05-24", amount: 120.50, concept: "Payment" }
];
  let [account_movements_count, setAccountMovements] = useState(5);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="2xl" className="mt-10">
          <Heading size="2xl" className="text-center">Finance</Heading>

          {/* Card 2 */}
          <VStack space="xs">
            <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
                <VStack space="md">
                <Heading size="xl" className="text-up-white text-center">
                Next Payment
                </Heading>
                <HStack className="items-center space-x-4">
                    <Heading size="md" className="text-up-white w-1/3">
                    Balance
                    </Heading>
                    <Text className="text-right text-black bg-up-white rounded-full px-3 py-1 flex-1">
                    {(balance < 0 ? "- " : "") + "$" + Math.abs(balance) + " MXN"}
                    </Text>
                </HStack>
                    {(balance < 0) && (
                        <HStack className="items-center space-x-4">
                            <Heading size="md" className="text-up-white w-1/3">
                            Due Date
                            </Heading>
                            <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                            {due_date}
                            </Text>
                        </HStack>
                    )}
                </VStack>
            </Card>
            {(balance < 0) && (
                <Button className="bg-up-red rounded-3xl">
                    <ButtonText size="xl">
                        Pay Now!
                    </ButtonText>
                </Button>
            )}
          </VStack>

          {/* Card 3 */}
          <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Recent Movements
            </Heading>
                {account_movements.slice(0,account_movements_count).map((movement,key) => (
                    <HStack key={key}>
                        <Heading size="sm" className="text-up-white w-1/3">
                            {movement.date}
                        </Heading>
                        <Text className="text-right text-black bg-up-white rounded-full px-4 py-1 flex-1">
                            {(movement.amount < 0 ? "- " : "") + "$" + Math.abs(movement.amount) + " MXN"}
                        </Text>
                    </HStack>
                ))}
                {account_movements_count < account_movements.length - 1 && (
                <Button onPress={() => setAccountMovements(account_movements_count + 5)} className="bg-up-red rounded-3xl">
                    <ButtonText>
                        See More
                    </ButtonText>
                    <ButtonIcon as={AddIcon}/>
                </Button>
                )}
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
