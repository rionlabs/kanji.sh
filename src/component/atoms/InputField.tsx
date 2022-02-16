import { Field, FieldProps } from 'formik';

const InputField: (props: FieldProps) => JSX.Element = (props: FieldProps) => <Field {...props} />;

export default InputField;
