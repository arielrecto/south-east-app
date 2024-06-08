
import * as FileSystem from 'expo-file-system';

export const convertToBase64 = async () => {
    try {
        const base64String = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64(base64String);
        console.log('Base64 String:', base64String);
      } catch (error) {
        console.log('Error converting file to base64:', error);
      }
}