'use client';

import * as React from 'react';
import { EngagementScoreProps } from '@/models/engagementScore';
import { Slot } from '@/models/Slot';
import { Stack, Typography } from '@mui/material';

import { EngagementScore } from '../common/engagement-score';

interface SessionDetailsProps {
  sessionId: string;
}

export function SessionDetails({ sessionId }: SessionDetailsProps): React.JSX.Element {
  const defaultEngagementScoreProps: EngagementScoreProps = { score: '0' };
  const defaultSlot: Slot = {
    id: '',
    title: '',
    date: '',
    time_from: '',
    time_to: '',
    engagement_score: 0,
    report: undefined,
    session_id: '',
    trainer_id: '',
  };

  const [engagementScoreProps, setEngagementScoreProps] =
    React.useState<EngagementScoreProps>(defaultEngagementScoreProps);
  const [slotDetails, setSlotDetails] = React.useState<Slot>(defaultSlot);

  React.useEffect(() => {
    // Simulated API call to fetch slot details based on sessionId
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
      setEngagementScoreProps({ score: apiResponse.engagement_score.toString() });
    };

    fetchSlotDetails();
  }, [sessionId]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold">
        Session Details
      </Typography>

      <Typography variant="body1">
        <strong>Title:</strong> {slotDetails.title}
      </Typography>
      <Typography variant="body1">
        <strong>Date:</strong> {slotDetails.date}
      </Typography>
      <Typography variant="body1">
        <strong>Time:</strong> {slotDetails.time_from} - {slotDetails.time_to}
      </Typography>
      <Typography variant="body1">
        <strong>Trainer ID:</strong> {slotDetails.trainer_id}
      </Typography>

      {slotDetails.report && (
        <Typography variant="body2" color="textSecondary">
          <strong>Report:</strong> {slotDetails.report}
        </Typography>
      )}

      <EngagementScore score={engagementScoreProps.score} />
    </Stack>
  );
}
