import InputField from '../atoms/InputField';
import { Field, Form, Formik } from 'formik';
import React from 'react';

interface Subscription {
    firstName?: string;
    lastName?: string;
    email?: string;
}
/* TODO: Remove formik dependecy, and use remix-forms */
const SubscriptionForm: React.FC = () => (
    <div className="container max-w-screen-sm sm:max-w-[480px]">
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
            {({ isSubmitting, isValid, status }) => (
                <Form>
                    <div className="flex flex-col items-stretch gap-8">
                        <div className="w-full">
                            <Field
                                component={InputField}
                                name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Taro"
                            />
                        </div>
                        <div className="w-full">
                            <Field
                                component={InputField}
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="taro@kanji.sh"
                            />
                        </div>
                        <div className="w-full text-center">
                            {/*disabled={}*/}
                            <button
                                type="submit"
                                className="button px-6"
                                disabled={!isValid && !isSubmitting}>
                                Subscribe for Updates
                            </button>
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
