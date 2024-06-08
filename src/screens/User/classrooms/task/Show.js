import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { getTask } from "../../../../controllers/TaskController";
import { Loader } from "../../../../components";
import { timeStamp } from "../../../../utils/dateFormat";
import { baseURL_Hub } from "../../../../utils/constant/config";
import { getThumbnails } from "../../../../utils/getThumbnails";
import { SvgUri } from "react-native-svg";
import { ROUTES } from "../../../../utils/constant";

export const Show = ({navigation}) => {
  //#region state variable
  const route = useRoute();
  const taskID = route.params.taskId;
  const [studentTask, setStudentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //#region actions
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getTask(taskID);
      setStudentTask({ ...response });
      console.log("====================================");
      console.log(response);
      console.log("====================================");
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsLoading(false);
    }
  };

  //#region useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 justify-between h-screen ">
        {isLoading ? (
          <View className="h-[500px] flex justify-center items-center">
            <Loader height={40} width={40} />
          </View>
        ) : (
          <View className="h-auto w-full bg-white rounded-lg p-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold capitalize">
                {studentTask?.task.name}
              </Text>
              <Text className="text-[5px] text-gray-500">
                {timeStamp(studentTask?.task.created_at)}
              </Text>
            </View>
            <View className="mt-2 flex-row justify-between">
              <View>
                <Text className="text-blue-500 text-[10px]">Score : {studentTask?.task.max_score}</Text>
              </View>
              <View>
                <Text className="text-[10px] text-gray-500">Duration: </Text>
                <Text className="text-[5px] text-gray-500">{`${studentTask?.task.start_date} - ${studentTask?.task.end_date}`}</Text>
              </View>
            </View>
            <View className="min-h-[200px] p-2 mt-2">
              <Text className="text-[10px] text-gray-500">Description</Text>
              <Text className="mt-2">{studentTask?.task.description}</Text>
            </View>

            {studentTask?.task.attachments.length !== 0 ? (
              <ScrollView
                horizontal
                className="border-t border-gray-200 flex  flex-wrap"
              >
                {studentTask?.task.attachments.map((attachment) => (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        attachment.type === "url"
                          ? attachment.file
                          : `${baseURL_Hub}${attachment.file}`
                      )
                    }
                  >
                    <View
                      key={attachment.id}
                      className="w-16 h-16 rounded-lg border border-gray-200 p-2 ml-2 mt-2 flex justify-center items-center"
                    >
                      <SvgUri
                        height="20"
                        width="20"
                        uri={getThumbnails(attachment.extension)}
                        onError={(error) => {
                          console.log(error);
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View className="h-32 bg-gray-200 rounded-lg p-2 flex justify-center items-center">
                <Text className="text-[10px] ">No Attachments</Text>
              </View>
            )}

            <View className="mt-10">
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Classroom.task.submit, {taskID : studentTask.id})} className="flex-row justify-center py-2 px-4 rounded-lg bg-blue-400">
                <Text className="text-[10px] text-white">Submit Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
