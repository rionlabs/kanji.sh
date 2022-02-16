import InputField from '../atoms/InputField';
import PrimaryButton from '../atoms/PrimaryButton';
import { Field, Form, Formik } from 'formik';
import React from 'react';

interface Subscription {
    firstName?: string;
    lastName?: string;
    email?: string;
}

const SubscriptionForm: React.FC = () => (
    <div className="container max-w-screen-sm">
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: ''
            }}
            initialStatus={''}
            validate={(values) => {
                const errors: Partial<Subscription> = {};
                if (!values.firstName) {
                    errors.firstName = 'Required';
                }
                if (!values.lastName) {
                    errors.firstName = 'Required';
                }
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
                // Reset status
                setStatus('');
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                };

                fetch('/api/subscribe', requestOptions)
                    .then((response) => {
                        if (response.status == 200) return response.json();
                        else throw Error('API Error');
                    })
                    .then(() => {
                        resetForm();
                        setStatus('Thanks for subscribing!');
                    })
                    .catch((error) => {
                        console.error(error);
                        setStatus('An error occurred! Please try after some time.');
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}>
            {({ isSubmitting, status }) => (
                <Form>
                    <div className="container gap-2">
                        <div className="w-full sm:w-1/2">
                            <Field
                                component={InputField}
                                name="firstName"
                                type="text"
                                label="First Name"
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <Field
                                component={InputField}
                                name="lastName"
                                type="text"
                                label="Last Name"
                            />
                        </div>
                        <div className="w-full">
                            <Field component={InputField} name="email" type="email" label="Email" />
                        </div>
                        <div className="w-full">
                            {/*disabled={!isValid && !isSubmitting}*/}
                            <PrimaryButton>Subscribe for Updates</PrimaryButton>
                        </div>
                        <div className="w-full">{isSubmitting && <progress />}</div>
                        <div className="w-full">
                            <div>{status}</div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default SubscriptionForm;
