import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, LockIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { auth, db } from "@/constants/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";


import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

interface Course {
  courseName: string;
  grade: string;
  isCompleted: boolean;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  studies: {
    major: string
    start_date: string;
    end_date: string;
    status: string;
    semester: string;
    courses: Course[]
  };
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
              setUser({ id: userId, ...userData as Omit<User, 'id'> });
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

  console.log(user)


  return (
    <Center>
      <SafeAreaView>
        <VStack space='2xl' className='mt-10'>
          <Heading size="2xl" className="text-center">Profile</Heading>

          <VStack space="xs">
            <Heading className='text-center'>Full Name</Heading>
            <Text className='text-center bg-up-blue text-white rounded-full py-2'>{user.fullName}</Text>
          </VStack>

          <VStack space="xs">
            <Heading className='text-center'>Institutional Email</Heading>
            <Text className='text-center bg-up-blue text-white rounded-full py-2'>{user.email}</Text>
          </VStack>

          <VStack space="xs">
            <Heading className='text-center'>Password</Heading>
            <Text className='text-center bg-up-blue text-white rounded-full py-2'>***********</Text>
          </VStack>

          <VStack space="xs">
            <Button className="bg-up-red rounded-full">
              <ButtonText>Change Password</ButtonText>
              <ButtonIcon as={EyeIcon} />
            </Button>

            <Button
              className="bg-up-red rounded-3xl"
              onPress={handleSignOut}
            >
              <ButtonText>Sign Out</ButtonText>
              <ButtonIcon as={LockIcon} />
            </Button>
          </VStack>

          <Card className="bg-up-gold rounded-3xl">
            <Center>
              <VStack space="md">
                <VStack space="xs">
                  <Heading size="md" className="text-up-white text-center">Career</Heading>
                  <Text className="text-black bg-up-white text-center rounded-full px-4">{user.studies.major}</Text>
                </VStack>

                <VStack space="xs">
                  <Heading size="md" className="text-up-white text-center">Start Date</Heading>
                  <Text className="text-black bg-up-white text-center rounded-full px-4">{user.studies.start_date}</Text>
                </VStack>

                <VStack space="xs">
                  <Heading size="md" className="text-up-white text-center">End Date</Heading>
                  <Text className="text-black bg-up-white text-center rounded-full px-4">{user.studies.end_date}</Text>
                </VStack>

                <VStack space="xs">
                  <Heading size="md" className="text-up-white text-center">Status</Heading>
                  <Text className="text-black bg-up-white text-center rounded-full px-4">{user.studies.status}</Text>
                </VStack>
              </VStack>
            </Center>
          </Card>
        </VStack>
      </SafeAreaView>
    </Center>
  );
}
