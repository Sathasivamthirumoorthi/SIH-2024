'use client';

import * as React from 'react';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import apiClient from '@/utils/api';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { EngagementScore } from '../common/engagement-score';

interface InstutionDetailsProps {
  instution: InstutionDetailsInterface;
}
export function InstutionDetails({ instution }: InstutionDetailsProps): React.JSX.Element {
  const [Oes, setOes] = React.useState(0);

  React.useEffect(() => {
    const fetchOverallInstitutionEngagementScore = async () => {
      try {
        const overallSessionEngagementScore = await apiClient.get(`/institutions/${instution.uid}/engagement`);
        console.log('asdasdas,', overallSessionEngagementScore);
        setOes(overallSessionEngagementScore.data.average_engagement_score);
      } catch (error) {}
    };
    fetchOverallInstitutionEngagementScore();
  }, []);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">Name : {instution.name}</Typography>

        <Typography variant="h5">Location : {instution.location}</Typography>

        <Typography variant="h5">Status : {instution.status}</Typography>

        <Typography variant="h5">No of Sessions : {instution.sessions?.length}</Typography>

        <Typography variant="h5">No of Trainers : {instution.trainers?.length}</Typography>

        <EngagementScore
          name="Avarage Engagement score of this instution"
          score={Oes === null ? '0' : JSON.stringify(Oes)}
        />
      </Stack>
    </>
  );
}
