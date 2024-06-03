import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View } from "react-native"

export const Modal = ({isOpen, withKeyboard, children, ...rest}) => {

    const content  =  withKeyboard ? 
    (<>
        <KeyboardAvoidingView className="flex-1 justify-center items-center">
            {children}
        </KeyboardAvoidingView>
    </>) :
    (<>
        <View className="flex-1 justify-center items-center">
            {children}
        </View>
    </>)



return (<>
    <RNModal 
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        {...rest}
    >
        {content}
    </RNModal>
</>)

}
