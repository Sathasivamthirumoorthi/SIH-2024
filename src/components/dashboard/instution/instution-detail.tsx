'use client';

import * as React from 'react';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Stack } from '@mui/system';

import { EngagementScore } from '../common/engagement-score';

interface InstutionDetailsProps {
  instution: InstutionDetailsInterface;
}
export function InstutionDetails({ instution }: InstutionDetailsProps): React.JSX.Element {
  return (
    <>
      <Stack>
        <EngagementScore
          name="Avarage Engagement score of this instution"
          score={instution?.average_score === null ? '0' : JSON.stringify(instution?.average_score)}
        />
      </Stack>
    </>
  );
}
