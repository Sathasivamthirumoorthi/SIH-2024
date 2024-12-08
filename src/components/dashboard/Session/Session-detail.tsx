'use client';

import * as React from 'react';
import { Slot } from '@/models/Slot';
import { Stack, Typography } from '@mui/material';

interface SessionDetailsProps {
  sessionId: string;
}

export function SessionDetails({ sessionId }: SessionDetailsProps): React.JSX.Element {
  const defaultSlot: Partial<Slot> = {
    trainer_name: '',
    session_engagement_score: 0,
    report: '',
  };

  const [slotDetails, setSlotDetails] = React.useState<Partial<Slot>>(defaultSlot);

  // Fetch slot details (simulated)
  React.useEffect(() => {
    const fetchSlotDetails = async () => {
      console.log('Fetching data for session:', sessionId);

      // Simulate API response
      const apiResponse: Partial<Slot> = {
        trainer_name: 'John Doe',
        session_engagement_score: 25.5,
        report: 'This session provided in-depth knowledge about React hooks.',
      };

      setSlotDetails(apiResponse);
    };

    fetchSlotDetails();
  }, [sessionId]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight="bold">
        Session Details
      </Typography>

      {/* Display Slot Details */}
      <Stack spacing={1}>
        <Typography variant="body1">
          <strong>Trainer Name:</strong> {slotDetails.trainer_name}
        </Typography>
        <Typography variant="body1">
          <strong>Session Engagement Score:</strong> {slotDetails.session_engagement_score}
        </Typography>
        {slotDetails.report && (
          <Typography variant="body2" color="textSecondary">
            <strong>Report:</strong> {slotDetails.report}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
