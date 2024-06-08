import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getToken } from "../../../../utils/tokenService";
import { getTasks } from "../../../../controllers/TaskController";
import { useRoute } from "@react-navigation/native";
import { Loader } from "../../../../components";
import { timeStamp } from "../../../../utils/dateFormat";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../../../utils/constant";

export const Index = ({navigation}) => {
  //#region state variable
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const classroomID = route.params.classroomID;

  //region  actions
  const getData = async () => {
    try {
      await getToken();
      setIsLoading(true);
      const response = await getTasks(classroomID);
      setTasks([...response]);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView className="flex-1 p-2">
      <View className="mt-6">
        <View className="bg-white rounded-lg p-2 shadow-sm shadow-black">
          <Text className="text-2xl font-bold">Tasks</Text>
        </View>

        {isLoading ? (
          <View className="h-[500] flex  justify-center items-center">
            <Loader height={40} width={40} />
          </View>
        ) : (
          <>
            {tasks.length !== 0 ? (<>
              <>
            {tasks.map((task) => (
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Classroom.task.show, {taskId : task.id})}  key={task.id}>
                <View
                  className="bg-white rounded-lg shadow-sm shadow-black h-auto mt-2 p-2 flex justify-between"
                 
                >
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[15px] font-bold capitalize">
                      {task?.name}
                    </Text>
                    <Text className="text-[5px] text-gray-500">
                      {timeStamp(task?.created_At)}
                    </Text>
                  </View>
                  <View className="mt-2">
                    <Text className="text-[8px] text-gray-500">Duration :</Text>
                    <Text className="text-[5px] text-gray-500">{`${timeStamp(
                      task?.start_date
                    )} - ${timeStamp(task?.end_date)}`}</Text>
                  </View>
                  <View className="flex-row justify-between mt-2">
                    <View className="flex-row items-center">
                      <Text className="text-[8px] text-gray-500">
                        {task?.attachments_count}
                      </Text>
                      <Text className="ml-2 text-[8px] text-gray-500">
                        Attachments
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
            </>) : (<>
            <View className="flex-1 justify-center items-center">
                  <Text>No Task </Text>
            </View>
            </>)}
          </>
        )}
      </View>
    </ScrollView>
  );
};
