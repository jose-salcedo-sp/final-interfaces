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
    let current_gpa = 3.8

  let courses = [
  { courseName: "Calculus I", Grade: "B+", isCompleted: true },
  { courseName: "General Chemistry", Grade: "A-", isCompleted: true },
  { courseName: "Introduction to Psychology", Grade: "A", isCompleted: true },
  { courseName: "English Composition", Grade: "B", isCompleted: true },
  { courseName: "CS Fundamentals", Grade: "B", isCompleted: false },
  { courseName: "Principles of Economics", Grade: "A+", isCompleted: false },
  { courseName: "Cell Biology", Grade: "C+", isCompleted: true },
  { courseName: "Linear Algebra", Grade: "C", isCompleted: false },
  { courseName: "Public Speaking", Grade: "A", isCompleted: true },
  { courseName: "Data Structures", Grade: "D", isCompleted: false },
  { courseName: "Databases", Grade: "A", isCompleted: true },
];

const completed_courses = courses.filter(course => course.isCompleted);
const current_courses = courses.filter(course => !course.isCompleted);
  let [completed_courses_count, setCourses] = useState(5);

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
                {current_gpa + "/4"}
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
                <Button onPress={() => setCourses(completed_courses_count + 5)} className="bg-up-red rounded-3xl">
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
