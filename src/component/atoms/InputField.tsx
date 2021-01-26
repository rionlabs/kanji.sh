import { styled } from '@material-ui/core';
import 'formik-material-ui';
import { TextField, TextFieldProps } from 'formik-material-ui';

const StyledTextField = styled(TextField)(() => ({}));

const InputField: (props: TextFieldProps) => JSX.Element = (props: TextFieldProps) => (
    <StyledTextField
        variant={'outlined'}
        color={'primary'}
        multiline={false}
        fullWidth={true}
        {...props}
    />
);

export default InputField;
