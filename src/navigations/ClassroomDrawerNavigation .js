import { createDrawerNavigator } from "@react-navigation/drawer";
import { ROUTES } from "../utils/constant";
import { ClassroomShow, AttendanceList, TaskList } from "../screens/User";
import { useRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const ClassroomDrawerNavigation = ({ navigation }) => {
  const route = useRoute();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name={ROUTES.Classroom.Show}
        initialParams={{ classroomID: route.params.classroomID }}
        component={ClassroomShow}
      />
      <Drawer.Screen
        name={ROUTES.Classroom.attendance.list}
        options={{
          title: "Attendance",
        }}
        initialParams={{ classroomID: route.params.classroomID }}
        component={AttendanceList}
      />
       <Drawer.Screen
        name={ROUTES.Classroom.task.list}
        options={{
          title: "Tasks",
        }}
        initialParams={{ classroomID: route.params.classroomID }}
        component={TaskList}
      />
    </Drawer.Navigator>
  );
};
