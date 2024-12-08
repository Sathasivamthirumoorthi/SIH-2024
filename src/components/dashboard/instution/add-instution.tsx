'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AddInstitutionRequest } from '@/models/InstutionDetails';
import apiClient from '@/utils/api';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { isValid } from 'zod';

import { paths } from '@/paths';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

export function AddInstitution(): React.JSX.Element {
  const router = useRouter();
  const handleFormSubmit = async (values: { name: string; location: string; email: string }) => {
    try {
      const instutionRequestObject: AddInstitutionRequest = {
        name: values.name,
        location: values.location,
        email: values.email,
      };
      await apiClient.post('/institutions/', instutionRequestObject);
      console.log('instution created');
      router.push(paths.dashboard.instutions.overview);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  const handleBackToInstitutions = () => {
    router.push(paths.dashboard.instutions.overview);
  };
  return (
    <Formik
      initialValues={{ name: '', location: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, handleBlur, touched, errors, isValid, isSubmitting }) => (
        <Form>
          <Button
            onClick={handleBackToInstitutions}
            startIcon={<ArrowLeftIcon />}
            variant="contained"
            sx={{ marginBottom: '20px' }}
          >
            Back to instutions
          </Button>
          <Card>
            <CardHeader title="Add Institution" subheader="Fill out the form to add a new institution" />
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
                    label="Location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button disabled={!isValid || isSubmitting} type="submit" variant="contained">
                Add Institution {isValid}
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
