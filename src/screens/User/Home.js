import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BaseLayout, Loader, Modal } from "./../../components";
import { useEffect, useState } from "react";
import {
  getClassrooms,
  joinClassroom,
} from "../../controllers/ClassroomController";
import { getToken } from "../../utils/tokenService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import { ROUTES } from "../../utils/constant";

export const Home = ({navigation}) => {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [joinClassModal, setJoinClassModal] = useState(false);
  const [classCodeData, setClassCodeData] = useState({
    classCode : ''
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function runEffect() {
      try {
        setIsLoading(true);
        await getToken();

        const response = await getClassrooms();

        console.log("====================================");
        console.log(response.classrooms);
        console.log("====================================");

        setClassrooms([...response.classrooms]);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      } finally {
        setIsLoading(false);
      }
    }

    runEffect();
  }, []);

  const joinClassHandler = async () => {
    try {
      setIsSending(true);
      await getToken();

      console.log('====================================');
      console.log(classCodeData);
      console.log('====================================');

      const response = await joinClassroom(classCodeData);

      console.log('====================================');
      console.log(response);
      console.log('===================================='); 

      setClassrooms([response.classroom, ...classrooms]);

      Toast.show({
        type : 'success',
        text1 : `Enrolled` 
      })

    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.message);
      console.log("====================================");
      if (error.response?.status === 404) {
        Toast.show({
          type : 'error',
          text1 : `${error.response.data.error.class_code}`
        })
        setError(error.response.data.error);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <BaseLayout>
        <View className="flex-col p-2">
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={() => setJoinClassModal(!joinClassModal)}
              className="p-2 rounded-lg bg-blue-500"
            >
              <Text className="text-white text-[10px]">Join Class</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Loader height={40} width={40} />
            </View>
          ) : (
            <>
              {classrooms.length === 0 ? (
                <View className="h-96 bg-gray-200 rounded-lg mt-2 flex items-center justify-center">
                  <Text className="text-[10px] font-bold">No Classroom</Text>
                </View>
              ) : (
                <>
                  {classrooms.map((classroom) => (
                    <Pressable onPress={() => navigation.navigate(ROUTES.ClassroomDrawer, {classroomID : classroom.id})} key={classroom.id}>
                      <View className="bg-blue-50 shadow-lg shadow-black rounded-lg p-2 mt-2">
                        <Text className="text-2xl  tracking-widest capitalize">
                          {classroom.subject.name}
                        </Text>
                        <Text className="text-[10px] mt-2">
                          Strand: {classroom.strand.name}
                        </Text>
                        <Text className="text-[12px] mt-2">
                          Teacher : {classroom.teacher.name}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </>
              )}
            </>
          )}
        </View>
        <Modal isOpen={joinClassModal}>
          <View className="bg-white rounded-lg w-full p-5">
            <View className="flex-row justify-end">
              <TouchableOpacity onPress={() => {
                setJoinClassModal(false)
                setError(null)
              }}>
                <Icon name="close" size={22} />
              </TouchableOpacity>
            </View>
            <Text className="text-[10px]">Enter Class Code</Text>
            <TextInput
              className="p-2 rounded-lg border-2 border-blue-500 mt-2"
              onChangeText={(text) => setClassCodeData({
                ...classCodeData,
                classCode :  text
              })}
            />
            {error?.class_code ? (
              <Text className="text-[10px] text-red-500">
                {error?.class_code}
              </Text>
            ) : (
              ""
            )}
            <TouchableOpacity
              disabled={isSending}
              className="p-2 rounded-lg bg-blue-500 mt-2"
              onPress={() => joinClassHandler()}
            >
              {isSending ? (
                <View className="flex-row justify-center">
                  <Loader height={40} width={40} />
                </View>
              ) : (
                <Text className="text-white font-bold text-center">Join</Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </BaseLayout>
    </>
  );
};
