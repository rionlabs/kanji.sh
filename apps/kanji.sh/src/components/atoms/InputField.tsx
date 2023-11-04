import type { InputHTMLAttributes } from 'react';

export type FieldProps = InputHTMLAttributes<HTMLInputElement>;

export const InputField = (props: FieldProps) => {
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
