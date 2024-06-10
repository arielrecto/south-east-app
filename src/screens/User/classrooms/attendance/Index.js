import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "../../../../components";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ROUTES } from "../../../../utils/constant";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { attendanceIndex } from "../../../../controllers/AttendanceController";
import AuthContext from "../../../../context/AuthContext";
import QRCode from "react-native-qrcode-svg";
import { timeFormat } from "../../../../utils/dateFormat";
import moment from "moment";

export const Index = ({ navigation }) => {
  const route = useRoute();

  const { user } = useContext(AuthContext);

  const classroomID = route.params.classroomID;
  const [attendances, setAttendances] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);

  const loadAttendance = async () => {
    try {
      const response = await attendanceIndex(classroomID);

      console.log(response);

      setAttendances([...response.attendances]);
      setAttendance({ ...response.attendance });
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAttendance();
    }, [])
  );

  useEffect(() => {
    if (!attendance) return;

    setQrCodeValue(
      `${attendance?.attendance_code}-${user.user.id}-${classroomID}`
    );
  }, [attendance]);

  useEffect(() => {
    if (attendance?.end_time) {
      const endTime = moment(attendance.end_time, "HH:mm");

      const updateRemainingTime = () => {
        const currentTime = moment();
        const duration = moment.duration(endTime.diff(currentTime));
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setRemainingTime({ hours, minutes, seconds });
      };

      updateRemainingTime();
      const intervalId = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, [attendance?.end_time]);

  const currentDateTime = moment();

  const startTime = attendance?.start_time
    ? moment(attendance.start_time, "HH:mm")
    : null;
  const endTime = attendance?.end_time
    ? moment(attendance.end_time, "HH:mm")
    : null;

  const isAttendanceActive =
    startTime && endTime && currentDateTime.isBetween(startTime, endTime);

  return (
    <ScrollView className="flex-1 mt-10 p-2">
      <View className="flex-row flex-wrap">
        <View className="grow bg-white rounded-lg shadow-sm shadow-black h-32 p-2 flex justify-between">
          <Text className="font-bold capitalize">Present</Text>
          <Text className="text-[50px] font-bold text-center text-blue-500">
            {" "}
            {attendances.length}
          </Text>
        </View>
        {/* <View className="grow bg-white rounded-lg shadow-sm shadow-black h-32 ml-2 p-2">
          <Text>Absents</Text>
        </View> */}
      </View>
      <View className="py-2 flex-row justify-between items-center">
        <Text>Attendance</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.Classroom.attendance.scanner, {
              classroomID,
            })
          }
          className="bg-blue-300 p-2 rounded-lg"
        >
          <MIcon name="line-scan" size={20} />
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-lg shadow-sm shadow-black p-2">
        {attendance?.attendance_code ? (
          <>
            <View className="w-full flex-row justify-center">
              <View className="flex space-y-2">
                {qrCodeValue && (
                  <>
                    {isAttendanceActive ? (
                      <QRCode
                        value={qrCodeValue}
                        size={250}
                        logo={require("./../../../../../assets/icon.png")}
                      />
                    ) : (
                      <>
                        <View className="flex items-center justify-center bg-gray-100 rounded-lg h-32">
                          <Text>Attendance Close</Text>
                        </View>
                      </>
                    )}
                  </>
                )}
                <Text className="text-[10px] text-center text-gray-500">
                  {qrCodeValue}
                </Text>
                <Text className="text-[10px] text-center text-gray-500">
                  Duration : {timeFormat(attendance?.start_time)} -{" "}
                  {timeFormat(attendance?.end_time)}
                </Text>
                {isAttendanceActive && remainingTime && (
                  <Text className="text-[10px] text-center text-gray-500">
                    Time Remaining: {remainingTime.hours}h{" "}
                    {remainingTime.minutes}m {remainingTime.seconds}s
                  </Text>
                )}
                {!isAttendanceActive && (
                  <Text className="text-[10px] text-center text-gray-500">
                    Attendance is Closed
                  </Text>
                )}
              </View>
            </View>
          </>
        ) : (
          <>
            <View className="h-32 flex items-center justify-center bg-gray-100 rounded-lg">
              <Text>No Attendance QR</Text>
            </View>
          </>
        )}
      </View>

      <View className="mt-2">
        <Calendar className="mt-2" />
      </View>
    </ScrollView>
  );
};
