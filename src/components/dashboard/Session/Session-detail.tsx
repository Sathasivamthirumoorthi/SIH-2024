'use client';

import * as React from 'react';
import { Session } from '@/models/sessionsDetail';
import { slot } from '@/models/Slot';
import { Stack, Typography } from '@mui/material';

interface SessionDetailsProps {
  session: Session;
}

export function SessionDetails({ session }: SessionDetailsProps): React.JSX.Element {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight="bold">
        Session Details
      </Typography>

      {/* Display Slot Details */}
      <Stack spacing={1}>
        {session.trainer_ids.length <= 1 ? (
          <Typography variant="body1">
            {/* add if one trainer */}
            <strong>Trainer Name:</strong>
          </Typography>
        ) : (
          <Typography variant="body1">
            {/* add trainer comma seperator */}
            <strong>Trainers Name:</strong>
          </Typography>
        )}

        <Typography variant="body1">
          <strong>Session Engagement Score:</strong>
        </Typography>
        {/* {slotDetails.report && (
          <Typography variant="body2" color="textSecondary">
            <strong>Report:</strong> 
          </Typography>
        )} */}
      </Stack>
    </Stack>
  );
}
