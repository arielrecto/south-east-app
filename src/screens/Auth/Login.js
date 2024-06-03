import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { ROUTES } from "./../../utils/constant";
import { Login as LoginController } from "./../../controllers/AuthController";
import { setToken } from "./../../utils/tokenService";
import AuthContext from "./../../context/AuthContext";
import Toast from "react-native-toast-message";
export const Login = ({ navigation }) => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { setUser } = useContext(AuthContext);

  const loginHandler = async () => {
    try {
      const response = await LoginController(credential);

      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.log(error.response.data);

      if (error?.response.status === 401) {
        console.log('====================================');
        console.log(error.response.data.error);
        console.log('====================================');
        setError({
          ...error.response.data.error
        })
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-tr from-blue-100 to-blue-900 justify-center items-center p-5">
      <View className="flex flex-col gap-2">
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

        <View className="bg-blue-100 shadow shadow-blue-900 p-2">
          <Text className="text-center font-bold text-blue-500 text-xl tracking-widest">
            Login
          </Text>
          {error?.credentials ? <Text className="text-[10px] text-red-500">{error?.credentials}</Text> : ""}
          <View>
            <Text className="text-[12px] text-gray-600">Email</Text>
            <TextInput
              keyboardType="email-address"
              onChangeText={(text) =>
                setCredential({
                  ...credential,
                  email: text,
                })
              }
              className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
            />
          </View>
          <View className="mt-2">
            <Text className="text-[12px] text-gray-600">Password</Text>
            <TextInput
              keyboardType="text"
              onChangeText={(text) =>
                setCredential({
                  ...credential,
                  password: text,
                })
              }
              secureTextEntry={true}
              className="bg-white mt-2 rounded-lg border border-blue-500 p-1"
            />
          </View>
          <TouchableOpacity
            onPress={() => loginHandler()}
            className="mt-2 rounded-lg bg-blue-500 p-2 "
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.Register)}
            className="flex-row"
          >
            <Text className="text-[12px] text-gray-600 mt-2 underline">
              Create New Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
