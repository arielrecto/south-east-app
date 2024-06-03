import { View, Text, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";
import { getToken } from "../../../../utils/tokenService";
import { addAttendance } from "../../../../controllers/AttendanceController";
export const Scanner = () => {
  //#region state variable
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(null);
  const route = useRoute();
  const classroomID = route.params.classroomID;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    Toast.show({
      type: "info",
      text1: "Need Camera Permission",
    });
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //#region action
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const scanHandler = ({ type, data }) => {
    if (scanned === data) return;

    console.log(data);

    Toast.show({
      type: "info",
      text1: data,
    });
    setScanned(data);
  };

  const submitAttendance = async () => {
    try {

        await getToken()

      const data = {
        attendanceCode: scanned,
        classroomId: classroomID,
      };


      const response = await addAttendance(data);

      console.log("====================================");
      console.log(response);
      console.log("====================================");

      Toast.show({
        type : "success",
        text1 : `${response.message}`
      })
      setScanned(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 p-2">
      <CameraView
        onBarcodeScanned={!scanned ? scanHandler : ""}
        className="h-[500px] flex relative"
        facing={facing}
      >
        <View className="bg-white absolute z-10 bottom-5 right-[150px] px-1  py-2 rounded-lg">
          {scanned ? (
            <TouchableOpacity className="" onPress={() => submitAttendance()}>
              <Text>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="" onPress={toggleCameraFacing}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
};
