import type { InputHTMLAttributes } from 'react';

export type FieldProps = InputHTMLAttributes<HTMLInputElement>;

const InputField: (props: FieldProps) => JSX.Element = (props: FieldProps) => {
    return (
        <input
            className="field w-full"
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            {...props}
        />
    );
};

export default InputField;
