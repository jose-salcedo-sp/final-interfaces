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
  let career: string = "Computer Systems Engineering";
  let career_start_date: string = "Aug 2022";
  let career_end_date: string = "June 2027";
  let career_status: string = "Enrolled";

  let semester:string = "7th";
  let completed_courses = ["Math", "Science", "Wth", "Wthy", "Wtha", "Wthb", "Wthlj"];
  let [completed_courses_count, setCourses] = useState(5);

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
                  {career}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  Status
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {career_status}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  Start
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {career_start_date}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/5">
                  End
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {career_end_date}
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
                  {semester}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/3">
                  Credits
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {career_status}
                </Text>
              </HStack>
              <HStack className="items-center space-x-4">
                <Heading size="md" className="text-up-white w-1/3">
                  Courses
                </Heading>
                <Text className="text-black bg-up-white rounded-full px-3 py-1 flex-1">
                  {career_start_date}
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
                        {course}
                    </Text>
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
