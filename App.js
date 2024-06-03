import { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { AuthNavigation, TabNavigation } from "./src/navigations";
import AuthContext from "./src/context/AuthContext";
import { getToken, deleteToken } from "./src/utils/tokenService";
import { getUser } from "./src/controllers/AuthController";
import { Loader } from "./src/components";
import Toast from 'react-native-toast-message';


export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function runEffect() {
      try {
        await getToken();

        setIsLoading(true);

        const response = await getUser();

        setUser(response);
      } catch (error) {
        console.log("====================================");
        console.log(error.response.data.message);
        console.log("====================================");
        // if(error.response.status === 401){
        //   deleteToken()
        //   setUser(null)
        //   return;
        // }
      } finally {
        setIsLoading(false);
      }
    }

    runEffect();
  }, []);


  if(isLoading){

    return (<View className="flex-1 justify-center items-center">
        <Loader height={150} width={150} />
    </View>)

  }


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <TabNavigation /> : <AuthNavigation />}
        <Toast />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
