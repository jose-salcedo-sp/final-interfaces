import { Card } from "@/components/ui/card";
import { Center } from '@/components/ui/center';
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import { auth, db } from "@/constants/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

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
    major:string
    start_date: string;
    end_date: string;
    status: string;
    semester: string;
    courses: Course[];
    credits: number;
    };
}

export default function Career() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed_courses_count, setCoursesCount] = useState(5);

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


  const coursesArray = Object.values(user.studies.courses);
  const completed_courses = coursesArray.filter(course => course.isCompleted);
  const current_courses = coursesArray.filter(course => !course.isCompleted);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="2xl" className="mt-10">
          <Heading size="2xl" className="text-center">Career Path</Heading>

          {/* Card 1 */}
          <Card className="bg-up-gold rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Summary
            </Heading>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  Career
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.major}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  Status
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.status}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  Start
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.start_date}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  End
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.end_date}
                </Text>
              </HStack>
            </VStack>
          </Card>

          {/* Card 2 */}
          <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Current Semester
            </Heading>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/3">
                  Semester
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.semester}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/3">
                  Credits
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {user.studies.credits}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/3">
                  Courses
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {current_courses.length}
                </Text>
              </HStack>
            </VStack>
          </Card>

          {/* Card 3 */}
          <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Completed Courses
            </Heading>
                {completed_courses.slice(0,completed_courses_count).map((course,key) => (
                    <Text className="text-black bg-up-white rounded-full px-4 py-1 flex-1" key={key}>
                        {course.courseName}
                    </Text>
                ))}
                {completed_courses_count < completed_courses.length - 1 && (
                <Button onPress={() => setCoursesCount(completed_courses_count + 5)} className="bg-up-red rounded-3xl">
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
