import {styled} from "@material-ui/core";
import 'formik-material-ui'
import {TextField, TextFieldProps} from "formik-material-ui";

const StyledTextField = styled(TextField)(({theme}) => ({}))

export default function InputField(props: TextFieldProps) {
    return <StyledTextField variant={"outlined"} color={'primary'} multiline={false} fullWidth={true}
                            {...props} />
}