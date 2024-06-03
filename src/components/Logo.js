import { Image } from "react-native";

export const Logo = ({ height = 20, width = 20}) => {
  return (
    <Image
            source={require("./../../assets/icon.png")}
             style={{resizeMode: "contain", height : height, width : width}} 
          />
  );
};
