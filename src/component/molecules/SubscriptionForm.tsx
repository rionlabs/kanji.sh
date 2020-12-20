import Grid from "@material-ui/core/Grid";
import InputField from "../atoms/InputField";
import Container from "@material-ui/core/Container";
import PrimaryButton from "../atoms/PrimaryButton";
import CenterGrid from "../atoms/CenterGrid";
import {Field, Form, Formik} from 'formik';
import React from "react";
import {LinearProgress} from "@material-ui/core";

interface Subscription {
    firstName?: string,
    lastName?: string,
    email?: string
}

export default function SubscriptionForm() {
    return (
        <Container maxWidth={"xs"}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: ''
                }}
                validate={values => {
                    const errors: Partial<Subscription> = {};
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    setTimeout(() => {
                        setSubmitting(false);
                        console.log(values)
                    }, 1000);
                }}
            >
                {({submitForm, isSubmitting, isValid}) =>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={InputField}
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={InputField}
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={InputField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </Grid>
                            <CenterGrid item xs={12}>
                                <PrimaryButton
                                    type="submit"
                                    disabled={!isValid && !isSubmitting}>
                                    Subscribe for Updates
                                </PrimaryButton>
                            </CenterGrid>
                            <CenterGrid item xs={12}>
                                {isSubmitting && <LinearProgress/>}
                            </CenterGrid>
                        </Grid>
                    </Form>
                }
            </Formik>
        </Container>
    );
}
