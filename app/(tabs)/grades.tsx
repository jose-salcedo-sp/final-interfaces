import { Card } from "@/components/ui/card";
import { Center } from '@/components/ui/center';
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";


import { auth, db } from "@/constants/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";


interface Course {
  courseName: string;
  Grade: string;
  isCompleted: boolean;
}

interface FinancialMovement {
  date: string;
  ammount: number;
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
          <Heading size="2xl" className="text-center">Grades</Heading>

          {/* Card 1 */}
            <Card className="bg-up-gold rounded-3xl p-6 space-y-4">
            <VStack space="md">
                <Heading size="xl" className="text-up-white text-center">
                Current GPA
                </Heading>
                <Text className="text-xl text-center text-black bg-up-white rounded-full px-6 py-4">
                {user.studies.current_gpa + "/4"}
                </Text>
            </VStack>
            </Card>

          {/* Card 3 */}
          <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Current Semester
            </Heading>
                {current_courses.map((course,key) => (
                    <HStack className="items-center space-x-4" key={key}>
                        <Heading size="md" className="text-up-white w-4/5">
                        {course.courseName}
                        </Heading>
                        <Text className="text-center text-black bg-up-white rounded-full px-3 py-1 flex-1">
                        {course.Grade}
                        </Text>
                    </HStack>
                ))}
            </VStack>
          </Card>

        {/* Card 3 */}
          <Card className="bg-up-blue rounded-3xl p-6 space-y-4">
            <VStack space="md">
            <Heading size="xl" className="text-up-white text-center">
              Completed Courses
            </Heading>
                {completed_courses.slice(0,completed_courses_count).map((course,key) => (
                    <HStack className="items-center space-x-4" key={key}>
                        <Heading size="md" className="text-up-white w-4/5">
                        {course.courseName}
                        </Heading>
                        <Text className="text-center text-black bg-up-white rounded-full px-3 py-1 flex-1">
                        {course.Grade}
                        </Text>
                    </HStack>
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
