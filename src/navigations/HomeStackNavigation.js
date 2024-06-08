import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../utils/constant";
import { Home, AttendanceScanner, AnnouncementShow, TaskShow, TaskSubmit} from "../screens/User";
import {ClassroomDrawerNavigation} from './ClassroomDrawerNavigation '

export const HomeStackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName={ROUTES.Home}>
        <Stack.Screen options={{
          headerShown : false
        }} name={ROUTES.Home} component={Home} />
        <Stack.Screen name={ROUTES.ClassroomDrawer} options={{
          headerShown : false,
        }} component={ClassroomDrawerNavigation} />
        <Stack.Screen name={ROUTES.Classroom.announcement.show} options={{
          title : "Announcement"
        }} component={AnnouncementShow} />
        <Stack.Screen name={ROUTES.Classroom.attendance.scanner} options={{
          title : "QR Attendance Scanner"
        }} component={AttendanceScanner} />
         <Stack.Screen name={ROUTES.Classroom.task.show} options={{
          title : "Task"
        }} component={TaskShow} />
        
         <Stack.Screen options={{
          title : ""
        }} name={ROUTES.Classroom.task.submit} component={TaskSubmit} />
       {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </>
  );
};
