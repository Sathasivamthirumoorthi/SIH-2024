'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { paths } from '@/paths';





// Validation schema for the session form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  institution_id: Yup.string().required('Institution ID is required'),
  no_of_slots: Yup.number().required('Number of Slots is required').min(1, 'Number of Slots must be at least 1'),
  slots: Yup.string()
    .required('Slots are required')
    .matches(/^\s*\w+(,\s*\w+)*\s*$/, 'Slots must be comma-separated values'),
});

export function AddSession(): React.JSX.Element {
  const router = useRouter();

  const handleFormSubmit = async (values: {
    name: string;
    institution_id: string;
    no_of_slots: number;
    slots: string;
  }) => {
    try {
      console.log('Form values:', values);

      // Convert comma-separated strings into arrays
      const payload = {
        ...values,
        slots: values.slots.split(',').map((slot) => slot.trim()),
      };

      // Example API call
      // const response = await fetch('/api/sessions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

      // if (response.ok) {
      //   console.log('Session added successfully!');
      //   router.push('/path-to-session-overview');
      // } else {
      //   console.error('Failed to add session:', response.statusText);
      // }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleBackToSession = () => {
    router.push(paths.dashboard.Session.overview);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        institution_id: '',
        no_of_slots: 0,
        slots: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, handleBlur, touched, errors, isValid, isSubmitting }) => (
        <Form>
          <Button onClick={handleBackToSession} variant="contained" sx={{ marginBottom: '20px' }}>
            Back to Sessions
          </Button>
          <Card>
            <CardHeader title="Add Session" subheader="Fill out the form to add a new session" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Institution ID"
                    name="institution_id"
                    value={values.institution_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.institution_id && Boolean(errors.institution_id)}
                    helperText={touched.institution_id && errors.institution_id}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Number of Slots"
                    name="no_of_slots"
                    type="number"
                    value={values.no_of_slots}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.no_of_slots && Boolean(errors.no_of_slots)}
                    helperText={touched.no_of_slots && errors.no_of_slots}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Slots (comma-separated)"
                    name="slots"
                    value={values.slots}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.slots && Boolean(errors.slots)}
                    helperText={touched.slots && errors.slots}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button disabled={!isValid || isSubmitting} type="submit" variant="contained">
                Add Session
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}