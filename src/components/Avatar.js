import { Image } from "react-native";

export const Avatar = ({ height = 20, width = 20, url }) => {
    const avatarURL = url ? url : 'https://ui-avatars.com/api/?name=ariel+recto&format=jpeg';
  return (
    <Image
      source={{uri : avatarURL}}
      style={{ resizeMode: "contain", height: height, width: width }}
      className="rounded-full"
    />
  );
};
