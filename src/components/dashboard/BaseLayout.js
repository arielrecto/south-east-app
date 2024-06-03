import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { Logo } from "../Logo";
import { Avatar } from "../Avatar";
export const BaseLayout = ({ children }) => {
  return (
    <>
      <SafeAreaView className="flex-1 mt-10 p-2 bg-gray-100">
        <View className="flex-row items-center justify-between bg-white p-2 rounded-lg shadow-lg shadow-black">
          <View className="flex-row">
            <Logo height={50} width={50} />
            <View className="p-1">
                <Text className="text-blue-500 font-bold tracking-widest">
                    South East-Asia
                </Text>
                <Text className="text-[10px] text-gray-500">
                    Institute of Trade And Technology
                </Text>
            </View>
          </View>
          <Avatar height={40} width={40} />
        </View>
        <ScrollView className="p-2">{children}</ScrollView>
      </SafeAreaView>
    </>
  );
};
