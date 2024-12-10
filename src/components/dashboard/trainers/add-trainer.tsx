'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AddTrainerRequest } from '@/models/TrainersDetails';
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
import { useUser } from '@/hooks/use-user';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),

  email: Yup.string().email('Invalid email format').required('Email is required'),
});

export function AddTrainers(): React.JSX.Element {
  const { checkSession, user } = useUser();
  console.log(user);
  const router = useRouter();
  const handleFormSubmit = async (values: { name: string; email: string }) => {
    try {
      const trainerRequestObject: AddTrainerRequest = {
        name: values.name,
        email: values.email,
        institution_id: user?.instutionId,
      };
      await apiClient.post('/trainers/', trainerRequestObject);

      router.push(paths.dashboard.trainers.overview);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  const handleBackToTrainers = () => {
    router.push(paths.dashboard.trainers.overview);
  };
  return (
    <Formik initialValues={{ name: '', email: '' }} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, touched, errors, isValid, isSubmitting }) => (
        <Form>
          <Button
            onClick={handleBackToTrainers}
            startIcon={<ArrowLeftIcon />}
            variant="contained"
            sx={{ marginBottom: '20px' }}
          >
            Back to Trainers
          </Button>
          <Card>
            <CardHeader title="Add Trainers" subheader="Fill out the form to add a new Trainer" />
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
                Add Trainer {isValid}
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
