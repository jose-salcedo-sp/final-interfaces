import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { auth, db } from "@/constants/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface Course {
  courseName: string;
  Grade: string;
  isCompleted: boolean;
}

interface FinancialMovement {
  date: string;
  amount: number;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  studies: {
    major:string
    start_date: string;
    end_date: string;
    status: string;
    semester: string;
    courses: Course[];
    credits: number;
    current_gpa: number;
    };

  finances: {
    balance: number;
    due_date: string;
    movements: FinancialMovement[];
  }
}

export default function Career() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [account_movements_count, setAccountMovements] = useState(5);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        try {
          console.log("Fetching user data for:", firebaseUser.email);
          
          const usersRef = ref(db, 'users');
          const snapshot = await get(usersRef);

          if (snapshot.exists()) {
            const users = snapshot.val();
            const foundUser = Object.entries(users).find(([_, userData]) => 
              (userData as any).email === firebaseUser.email
            );

            if (foundUser) {
              const [userId, userData] = foundUser;
              setUser({ 
                id: userId, 
                ...userData as Omit<User, 'id'>,
                studies: {
                  ...(userData as any).studies,
                  // Ensure courses array exists
                  courses: (userData as any).studies?.courses || []
                }
              });
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No user is currently logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Center>
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      </Center>
    );
  }

  if (!user) {
    return (
      <Center>
        <SafeAreaView>
          <Text>User not found</Text>
        </SafeAreaView>
      </Center>
    );
  }

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
                    {(user.finances.balance < 0 ? "- " : "") + "$" + Math.abs(user.finances.balance) + " MXN"}
                    </Text>
                </HStack>
                    {(user.finances.balance < 0) && (
                        <HStack className="items-center space-x-4">
                            <Heading size="md" className="text-up-white w-1/3">
                            Due Date
                            </Heading>
                            <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                            {user.finances.due_date}
                            </Text>
                        </HStack>
                    )}
                </VStack>
            </Card>
            {(user.finances.balance < 0) && (
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
                {user.finances.movements.sort((a,b) => b.date.localeCompare(a.date)).slice(0,account_movements_count).map((movement,key) => (
                    <HStack key={key}>
                        <Heading size="sm" className="text-up-white w-1/3">
                            {movement.date}
                        </Heading>
                        <Text className="text-right text-black bg-up-white rounded-full px-4 py-1 flex-1">
                            {(movement.amount < 0 ? "- " : "") + "$" + Math.abs(movement.amount) + " MXN"}
                        </Text>
                    </HStack>
                ))}
                {account_movements_count < user.finances.movements.length - 1 && (
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
