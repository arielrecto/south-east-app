import { Image } from "react-native"

export const Loader = ({height = 20, width = 20}) => {

    return (<Image source={require('./../../assets/pre-loader/loading-load.gif')} 
        style={
            {
                height : height,
                width : width
            }
        }
    />)
}