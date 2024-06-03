import { TextInput } from "react-native"


export const InputText = ({placeholder }) => {
    return (<>
        <TextInput className="p-2 rounded-lg border border-blue-500" placeholder={!placeholder  ? 'Write Something' : placeholder} />
    </>)    
}