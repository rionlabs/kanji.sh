export type FormState = 'idle' | 'submitting' | 'submitted';

export type Subscription = {
    name: string;
    email: string;
};

export type ActionData = {
    status: 'success' | 'error';
    formError?: string;
    errors?: {
        name?: string;
        email?: string;
    };
};
