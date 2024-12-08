'use client';

import * as React from 'react';
import { EngagementScoreProps } from '@/models/engagementScore';
import { Slot } from '@/models/Slot';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { EngagementScore } from '../common/engagement-score';

interface SessionDetailsProps {
  sessionId: string;
}

export function SessionDetails({ sessionId }: SessionDetailsProps): React.JSX.Element {
  const defaultSlot: Slot = {
    id: '',
    title: '',
    date: '',
    time_from: '',
    time_to: '',
    engagement_score: 0,
    report: '',
    session_id: '',
    trainer_id: '',
  };

  const [slotDetails, setSlotDetails] = React.useState<Slot>(defaultSlot);
  const [formState, setFormState] = React.useState<Slot>(defaultSlot);

  // Fetch slot details (simulated)
  React.useEffect(() => {
    const fetchSlotDetails = async () => {
      console.log('Fetching data for session:', sessionId);

      // Simulate API response
      const apiResponse: Slot = {
        id: '1',
        title: 'Morning Session',
        date: '2024-12-08',
        time_from: '10:00 AM',
        time_to: '12:00 PM',
        engagement_score: 22.22,
        report: 'Session covered basics of React.',
        session_id: sessionId,
        trainer_id: 'T123',
      };

      setSlotDetails(apiResponse);
      setFormState(apiResponse); // Initialize form with fetched data
    };

    fetchSlotDetails();
  }, [sessionId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Updating slot with data:', formState);

    // Simulate API update call
    setSlotDetails(formState); // Assume the update is successful
    alert('Slot information updated successfully!');
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight="bold">
        Session Details
      </Typography>

      {/* Display Slot Details */}
      <Stack spacing={1}>
        <Typography variant="body1">
          <strong>Current Details</strong>
        </Typography>
        <Typography variant="body1">Title: {slotDetails.title}</Typography>
        <Typography variant="body1">Date: {slotDetails.date}</Typography>
        <Typography variant="body1">
          Time: {slotDetails.time_from} - {slotDetails.time_to}
        </Typography>
        <Typography variant="body1">Trainer ID: {slotDetails.trainer_id}</Typography>
        <Typography variant="body1">Engagement Score: {slotDetails.engagement_score}</Typography>
        {slotDetails.report && (
          <Typography variant="body2" color="textSecondary">
            Report: {slotDetails.report}
          </Typography>
        )}
      </Stack>

      {/* Update Slot Form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h6">Update Slot Information</Typography>
          <TextField label="Title" name="title" value={formState.title} onChange={handleInputChange} fullWidth />
          <TextField
            label="Date"
            name="date"
            value={formState.date}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Time From"
            name="time_from"
            value={formState.time_from}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField label="Time To" name="time_to" value={formState.time_to} onChange={handleInputChange} fullWidth />
          <TextField
            label="Trainer ID"
            name="trainer_id"
            value={formState.trainer_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Engagement Score"
            name="engagement_score"
            value={formState.engagement_score}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Report"
            name="report"
            value={formState.report}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Update Slot
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
