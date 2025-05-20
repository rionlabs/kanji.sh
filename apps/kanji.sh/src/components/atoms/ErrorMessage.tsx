import React from 'react';

type ErrorMessageProps = {
    message?: string;
    hidden: boolean;
};

export const ErrorMessage = ({ message, hidden }: ErrorMessageProps) => {
    return (
        <label
            hidden={hidden || !message}
            aria-hidden={hidden || !message}
            className="text-error text-light px-5 transition-all"
            data-cy="form-error">
            {message}
        </label>
    );
};
