import { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "../../components/Modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteToken, getToken } from "../../utils/tokenService";
import AuthContext from './../../context/AuthContext'
import { Logout } from "../../controllers/AuthController";
export const Setting = () => {

  const [logoutModal, setLogoutModal] = useState(false);
  const {setUser} = useContext(AuthContext)

  const LogoutHandler = async () => {

    try {

        await getToken();

        const response = await Logout();

        setUser(null)
         await deleteToken()

        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }

  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-10 p-2 flex justify-center items-center">
      <TouchableOpacity
        onPress={() => setLogoutModal(true)}
        className="p-2 rounded-lg bg-red-600 w-full"
      >
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>

      <Modal isOpen={logoutModal}>
        <View className="bg-white w-full p-2">
        <View className="flex-row justify-end ">
          <TouchableOpacity onPress={() => setLogoutModal(false)}>
            <Icon name="close" size={22} />
          </TouchableOpacity>

        </View>
       
        <View className="flex justify-center items-center">
            <Image
              source={require("./../../../assets/sticker/exit.png")}
             className="h-32 w-32" 
            />
          </View>

          <Text className="font-bold text-center mt-2">Are You Sure to Logout ? </Text>

          <View className="flex-row gap-2 mt-5">
            <TouchableOpacity onPress={() => LogoutHandler()} className="p-2 rounded-lg grow bg-green-600">
                <Text className="text-white text-center">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLogoutModal(false)} className="p-2 rounded-lg grow bg-red-600">
                <Text className="text-white text-center" >No</Text>
            </TouchableOpacity>
          </View>
        </View>
       
       
      </Modal>
    </SafeAreaView>
  );
};
