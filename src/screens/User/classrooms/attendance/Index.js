import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "../../../../components";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ROUTES } from "../../../../utils/constant";
import { useRoute } from "@react-navigation/native";

export const Index = ({navigation}) => {

  const route = useRoute();

  const classroomID = route.params.classroomID

  console.log('====================================');
  console.log(classroomID);
  console.log('====================================');

  return (
    <ScrollView className="flex-1 mt-10 p-2">
      <View className="flex-row flex-wrap">
        <View className="grow bg-white rounded-lg shadow-sm shadow-black h-32 p-2">
          <Text>Present</Text>
        </View>
        <View className="grow bg-white rounded-lg shadow-sm shadow-black h-32 ml-2 p-2">
          <Text>Absents</Text>
        </View>
      </View>
    <View className="py-2 flex-row justify-between items-center">
        <Text>Attendance</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Classroom.attendance.scanner, {classroomID})} className="bg-blue-300 p-2 rounded-lg">
            <MIcon name="line-scan" size={20} />
        </TouchableOpacity>
    </View>
      <View className="mt-2">
        <Calendar className="mt-2" />
      </View>
    </ScrollView>
  );
};
