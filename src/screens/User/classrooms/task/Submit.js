import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { getToken } from "../../../../utils/tokenService";
import { baseURL } from "../../../../utils/constant";
export const Submit = ({ navigation }) => {
  const route = useRoute();
  const taskID = route.params.taskID;

  const attachmentInit = {
    attachments: [],
  };

  const [attachmentsData, setAttachmentsData] = useState(attachmentInit);

  const getDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.canceled) {
        setAttachmentsData({
          ...attachmentsData,
          attachments: [...attachmentsData.attachments, ...result.assets],
        });
        console.log("Document selected:", result);
      } else {
        console.log("Document picker canceled");
      }
    } catch (error) {
      Toast.show({ text1: "Error picking document:", error, type: "error" });
    }
  };

  const uploadDocuments = async () => {
    if (attachmentsData.attachments.length === 0) {
      Toast.show({ text1: "Please select at least one file!", type: "info" });
      return;
    }

    const formData = new FormData();
    attachmentsData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, {
            uri: file.uri,
            name : file.name,
            type: file.mimeType || "application/octet-stream",
        });
    });

    const token = await getToken();

    try {
      const response = await axios.post(
        `${baseURL}/classrooms/task/${taskID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add token if required
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${progress}%`);
            Toast.show({
              type: "info",
              text1: "uploading",
              text2: `Upload Progress: ${progress}%`,
            });
          },
        }
      );

      setAttachmentsData(attachmentInit)

      console.log("Upload response:", response.data);
      Toast.show({ text1: "Files uploaded successfully!", type: "success" });
    } catch (error) {
      console.log("Error uploading files:", error.response.data);
      Toast.show({ text1: "File upload failed!", type: "error" });
    }
  };

  return (
    <>
      <View className="flex-1 p-2 space-y-5 bg-white">
        <Text className="text-xl font-bold text-blue-500">Submit Task</Text>
        <View className="flex space-y-2">
          <Text>Attachments</Text>
          <TouchableOpacity
            className="px-2 py-4 rounded-lg bg-blue-300"
            onPress={() => getDocument()}
          >
            <Text className="text-xs  text-white">Upload Document</Text>
          </TouchableOpacity>
        </View>

        {attachmentsData.attachments.map((attachment) => (
          <View className="p-2 rounded-lg border border-gray-100 relative">
            <Text>{attachment.name}</Text>
          </View>
        ))}

        <TouchableOpacity
          className="px-2 py-4 rounded-lg bg-blue-500"
          onPress={() => uploadDocuments()}
        >
          <Text className="text-xs  text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
