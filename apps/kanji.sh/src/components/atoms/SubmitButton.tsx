'use client';

import { experimental_useFormStatus } from 'react-dom';

export function SubmitButton() {
    const { pending } = experimental_useFormStatus();
    return (
        <button type="submit" disabled={pending} aria-disabled={pending}>
            Add
        </button>
    );
}
