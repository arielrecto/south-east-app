import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { Register as RegisterController } from "./../../controllers/AuthController";
import Toast from "react-native-toast-message";
import { Loader } from "./../../components";
import { setToken } from "./../../utils/tokenService";
import AuthContext from "./../../context/AuthContext";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isSending, setIsSending] = useState(false);
  const {user, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const registerHandler = async () => {
    try {
      setIsSending(true);
      setError(null);

      const response = await RegisterController(registerData);

      setToken(response.token);
      setUser(response.user);

      Toast.show({
        type: "success",
        text1: "Register Success",
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        Toast.show({
          type: "error",
          text1: "Field Required",
        });
        setError(error.response.data.error);
        return;
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="flex-col">
        <View className="flex flex-row items-center gap-5">
          <Image
            source={require("./../../../assets/icon.png")}
            className="object-center h-32 w-32"
          />
          <View className="flex justify-center">
            <Text className="font-bold text-lg text-blue-500">
              SOUTH EAST-ASIA
            </Text>
            <Text className="text-xs text-center">INSTITUTE OF TRADE </Text>
            <Text className="text-xs text-center">AND TECHNOLOGY</Text>
          </View>
        </View>
        <View>
          <Text className="text-[12px] text-gray-600">Name</Text>
          <TextInput
            keyboardType="text"
            onChangeText={(text) =>
              setRegisterData({
                ...registerData,
                name: text,
              })
            }
            className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
          />
          {error?.name ? (
            <Text className="text-[10px] text-red-600">{error.name}</Text>
          ) : (
            ""
          )}
        </View>
        <View>
          <Text className="text-[12px] text-gray-600">Email</Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={(text) =>
              setRegisterData({
                ...registerData,
                email: text,
              })
            }
            className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
          />
          {error?.email ? (
            <Text className="text-[10px] text-red-600">{error.email}</Text>
          ) : (
            ""
          )}
        </View>
        <View>
          <Text className="text-[12px] text-gray-600">Password</Text>
          <TextInput
            keyboardType="text"
            secureTextEntry={true}
            onChangeText={(text) =>
              setRegisterData({
                ...registerData,
                password: text,
              })
            }
            className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
          />
          {error?.password ? (
            <Text className="text-[10px] text-red-600">{error.password}</Text>
          ) : (
            ""
          )}
        </View>
        <View>
          <Text className="text-[12px] text-gray-600">Confirm Password</Text>
          <TextInput
            keyboardType="text"
            secureTextEntry={true}
            onChangeText={(text) =>
              setRegisterData({
                ...registerData,
                password_confirmation: text,
              })
            }
            className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
          />
        </View>
        {isSending ? (
          <View className="p-2 rounded-lg bg-gray-200 mt-2 flex-row justify-center">
            <Loader height={30} width={30} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => registerHandler()}
            className="mt-2 p-2 rounded-lg bg-blue-500"
          >
            <Text className="text-white text-center">Register</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
