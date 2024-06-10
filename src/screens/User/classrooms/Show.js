import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { classroomShow } from "../../../controllers/ClassroomController";
import { useNavigation, useRoute } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { baseURL, ROUTES } from "../../../utils/constant";
import { Loader } from "./../../../components";
import { removeWordFromString } from "../../../utils/removeWordFromString";
import { timeStamp } from "../../../utils/dateFormat";

export const Show = () => {
  const [classroomData, setClassroomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const classroomId = route.params.classroomID;
  useEffect(() => {
    async function runEffect() {
      try {
        setIsLoading(true);
        const response = await classroomShow(classroomId);
        setClassroomData(response.classroom);
        console.log(response.classroom);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    runEffect();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: classroomData?.subject.name,
    });
  }, [classroomData?.subject.name]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loader height={50} width={50} />
      </View>
    );
  }

  console.log(`${baseURL}${classroomData?.image}`);

  return (
    <>
      <ScrollView className="flex-col gap-2 mt-5">
        <View className="h-34 w-full rounded-lg relative">
          <Image
            source={{
              uri: `${removeWordFromString(baseURL, "/api")}${
                classroomData?.image
              }`,
            }}
            className="h-64"
          />
          <View className="absolute z-10 mt-2 left-5">
            <Text className="capitalize text-font-bold text-lg">
              {classroomData?.subject.name}
            </Text>
            <Text className="text-[8px]">{classroomData?.strand.name}</Text>
          </View>
        </View>
        <View className="flex-row">
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.Classroom.attendance.list)}
            className="shadow-lg shadow-black h-32 bg-white 
          w-1/2 ml-2 rounded-lg p-2 flex-col justify-between"
          >
            <View className="flex items-center justify-center pt-4">
              <IonIcon name="qr-code" size={50} />
              <Text className="text-[15px] ml-5">Attendance</Text>
            </View>
            {/* <Text className="text-center text-4xl font-bold text-blue-500">
              {classroomData?.tasks_count}
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.Classroom.task.list)}
            className="shadow-lg shadow-black h-32 bg-white 
          w-1/2 ml-2 rounded-lg p-2 flex-col justify-between"
          >
            <View className="flex items-center justify-center pt-4">
              <IonIcon name="reader-outline" size={50} />
              <Text className="text-[15px] ml-5">Task</Text>
            </View>
            {/* <Text className="text-center text-4xl font-bold text-blue-500">
              {classroomData?.tasks_count}
            </Text> */}
          </TouchableOpacity>
        </View>
        <View className="p-2">
          <View
            className="shadow-lg shadow-black h-32
           bg-white w-full rounded-lg p-2 flex-col justify-between"
          >
            <View className="flex flex-row items-center">
              <IonIcon name="megaphone-outline" size={20} />
              <Text className="text-[15px] ml-5">Announcements / Lesson</Text>
            </View>
            <Text className="text-center text-4xl font-bold">
              {classroomData?.announcements_count}
            </Text>
          </View>
        </View>

        <View className="flex-col p-2">
          {classroomData?.announcements.length !== 0 ? (
            <>
              {classroomData?.announcements.map((announcement) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ROUTES.Classroom.announcement.show, {
                      announcementID: announcement.id,
                    })
                  }
                  key={announcement.id}
                >
                  <View
                    className="flex 
                   h-32 w-full mt-2 rounded-lg bg-white shadow-sm
                    shadow-black p-2 justify-between"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-2xl font-bold capitalize">
                        {announcement.title}
                      </Text>
                      <Text className="text-[5px] text-gray-500">
                        Date Posted :{timeStamp(announcement.created_at)}
                      </Text>
                    </View>
                    <View className="h-12 w-full bg-gray-200 truncate p-2">
                      <Text className="text-[5px]">
                        {announcement.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View className="h-34 w-full rounded-lg flex justify-center items-center">
              <Text>No Announcements</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
