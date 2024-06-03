import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native"
import { getToken } from "../../../../utils/tokenService";
import { announcementShow } from "../../../../controllers/ClassroomController";
import { Loader } from "../../../../components";
import { timeStamp } from "../../../../utils/dateFormat";

export const Show =() => {
    //#region state variable
    const navigation = useNavigation();
    const route = useRoute();
    const announcementID = route.params.announcementID;
    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //#region actions
    const getAnnouncement = async () => {
        try {
             await getToken();
            setIsLoading(true)
            const response = await announcementShow(announcementID);
            
            setAnnouncement({...response})

        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false)
        }
    }


    //#region useEffect

    useEffect(() => {
         getAnnouncement()
    }, [])

    return (<ScrollView className="flex-1">
        {isLoading ? 
        <View className="flex-1 justify-center items-center h-[500px]">
              <Loader height={40} width={40} /> 
        </View>
      
        : <View className="p-2 bg-white h-auto m-2  rounded-lg">
                <Text className="bg-gray-50 rounded-lg text-center py-2 capitalize  text-2xl font-bold">
                    {announcement?.title}
                </Text>
                <Text className="text-end text-[10px] mt-2 text-gray-500">
                    {timeStamp(announcement?.created_at)}
                </Text>

                <Text className="mt-2 border-t border-gray-100 text-[10px] p-2">
                    {announcement?.description}
                </Text>
            </View>}
    </ScrollView>)
}