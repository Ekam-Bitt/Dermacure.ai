'use client';
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea // Import Textarea for Query Text/Feedback
} from '@/lib/chakraui';
import { Field, FieldProps, Form, Formik } from 'formik';

export default function ContactForm() {
  // Validation function for Name
  function validateName(value: any) {
    let error;
    if (!value) {
      error = 'Name is Required';
    }
    return error;
  }

  // Validation function for Email
  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  // Validation function for Phone Number
  function validatePhone(value: string) {
    let error;
    if (!value) {
      error = 'Phone Number is Required';
    } else if (!/^\d{10}$/i.test(value)) {
      error = 'Invalid phone number';
    }
    return error;
  }

  // Validation function for Query
  function validateQuery(value: any) {
    let error;
    if (!value) {
      error = 'Feedback is Required';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', query: '' }} // Add email, phone, and query fields
      onSubmit={(values, actions) => {
        setTimeout(() => {
          // Display the form values in an alert
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <Form className="flex flex-col gap-3">
          <Field name="name" validate={validateName}>
            {({ field, form }: FieldProps<any>) => (
              <FormControl
                isInvalid={
                  (form.errors.name as unknown as boolean) &&
                  (form.touched.name as boolean)
                }
                mb={4}
              >
                <div className="flex justify-between items-center">
                  <FormLabel className="text-center text-xl m-0 p-0">
                    Name
                  </FormLabel>
                  <Input
                    {...field}
                    id="name"
                    className="w-[500px] bg-white border border-black hover:border-black"
                  />
                </div>
                <FormErrorMessage>
                  {form.errors.name as unknown as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" validate={validateEmail}>
            {({ field, form }: FieldProps<any>) => (
              <FormControl
                isInvalid={
                  (form.errors.email as unknown as boolean) &&
                  (form.touched.email as unknown as boolean)
                }
                mb={4}
              >
                <div className="flex justify-between items-center">
                  <FormLabel className="text-center text-xl m-0 p-0">
                    Email
                  </FormLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email" // Set input type to 'email'
                    className="w-[500px] bg-white border border-black hover:border-black"
                  />
                </div>
                <FormErrorMessage>
                  {form.errors.email as unknown as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="phone" validate={validatePhone}>
            {({ field, form }: FieldProps<any>) => (
              <FormControl
                isInvalid={
                  (form.errors.phone as unknown as boolean) &&
                  (form.touched.phone as unknown as boolean)
                }
                mb={4}
              >
                <div className="flex justify-between items-center">
                  <FormLabel className="text-center text-xl m-0 p-0">
                    Phone Number
                  </FormLabel>
                  <Input
                    {...field}
                    id="phone"
                    type="tel" // Set input type to 'tel' for phone numbers
                    className="w-[500px] bg-white border border-black hover:border-black"
                  />
                </div>
                <FormErrorMessage>
                  {form.errors.phone as unknown as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="query" validate={validateQuery}>
            {({ field, form }: FieldProps<any>) => (
              <FormControl
                isInvalid={
                  (form.errors.query as unknown as boolean) &&
                  (form.touched.query as unknown as boolean)
                }
                mb={4}
              >
                <FormLabel className="text-xl m-0 p-0">Feedback</FormLabel>
                <Input
                  {...field}
                  id="query"
                  className="w-full h-40 m-0 p-4 bg-white border border-black hover:border-black"
                />

                <FormErrorMessage>
                  {form.errors.query as unknown as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            className="bg-[#C726FF] text-white hover:bg-violet-800 w-44 h-12 rounded-full"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
