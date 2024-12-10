'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowDown } from '@phosphor-icons/react';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

// Validation schema for the session form
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  trainer_id: Yup.string().required('Trainer is required'),
  no_of_slots: Yup.number().required('Number of Slots is required').min(1, 'Number of Slots must be at least 1'),
  slots: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required('Title is required'),
        date: Yup.string().required('date is required'),
        time_from: Yup.string().required('From time is required'),
        time_to: Yup.string().required('To time is required'),
        trainer_id: Yup.string(),
      })
    )
    .required('Slots are required'),
  // have an array for Slots with re
});

export function AddSession(): React.JSX.Element {
  const router = useRouter();
  const { user } = useUser();
  const [noOfSlots, setNoOfSlots] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const handleFormSubmit = async (values: any) => {
    try {
      if (user?.instutionId) {
        values.institution_id = user?.instutionId;
        const trainerId = values.trainer_id;
        values.trainer_ids = [values.trainer_id];
        values.slots.forEach((slot: any) => {
          slot.trainer_id = trainerId;
        });
        console.log('Form values --- :', values);
        // sessions/
        await apiClient.post('/sessions/', values);
        router.push(paths.dashboard.Sessions.overview);
        console.log('Form values:', values);
      }

      // Convert comma-separated strings into arrays
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
    router.push(paths.dashboard.Sessions.overview);
  };

  React.useEffect(() => {
    const fetchTrainerDetail = async () => {
      try {
        const trainerDetail = await apiClient.get(`/trainers/institution/${user?.instutionId}`);
        // Handle the response as needed
        console.log(trainerDetail.data);
        setTrainers(trainerDetail.data || []);
      } catch (error) {
        console.error('Error fetching trainer details:', error);
      }
    };
    fetchTrainerDetail();
  }, []);

  // {
  //   "trainer_ids": [
  //     "af1cdcdc-3f2b-404f-a903-6d61cc9a45b4"
  //   ],
  //   "institution_id": "a0152682-513e-4834-8e5e-eae0a9a15dbc",
  //   "name": "AA",
  //   "no_of_slots": 1,
  //   "average_eng_score": 0,
  //   "slots": [
  //     {
  //       "title": "BB",
  //       "date": "12/12/2023",
  //       "time_from": "09:00",
  //       "time_to": "10:00",
  //       "trainer_id": "af1cdcdc-3f2b-404f-a903-6d61cc9a45b4"
  //     }
  //   ]
  // }

  return (
    <Formik
      initialValues={{
        name: '',
        institutionId: '',
        trainer_id: '',
        no_of_slots: 0,
        slots: [{ title: '', date: '', time_from: '', time_to: '', trainer_id: '' }],
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
                    select
                    label="Trainer"
                    name="trainer_id"
                    value={values.trainer_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.trainer_id && Boolean(errors.trainer_id)}
                    helperText={touched.trainer_id && errors.trainer_id}
                  >
                    {trainers.map((trainer: any) => (
                      <MenuItem key={trainer.uid} value={trainer.uid}>
                        {trainer.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={12}>
                  <FieldArray name="slots">
                    {({ push, remove }) => (
                      <>
                        {Array.from({ length: values.no_of_slots }).map((_, index) => (
                          <Accordion sx={{ borderColor: '-moz-initial' }} key={index}>
                            <AccordionSummary expandIcon={<ArrowDown />}>
                              <Typography variant="h6">Slot {index + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Title"
                                    name={`slots[${index}].title`}
                                    value={values.slots[index]?.title || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.slots?.[index]?.title}
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Date"
                                    name={`slots[${index}].date`}
                                    value={values.slots[index]?.date || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.slots?.[index]?.date}
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="From Time"
                                    name={`slots[${index}].time_from`}
                                    value={values.slots[index]?.time_from || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.slots?.[index]?.time_from}
                                  />
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="To Time"
                                    name={`slots[${index}].time_to`}
                                    value={values.slots[index]?.time_to || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.slots?.[index]?.time_to}
                                  />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </>
                    )}
                  </FieldArray>
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
