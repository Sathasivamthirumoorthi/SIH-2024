'use client';

import * as React from 'react';
import { EngagementScoreProps } from '@/models/engagementscore';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Stack } from '@mui/system';

import { EngagementScore } from '../common/engagement-score';

interface InstutionDetailsProps {
  instution: InstutionDetailsInterface;
}
export function InstutionDetails({ instution }: InstutionDetailsProps): React.JSX.Element {
  const defaultEngagementScoreProps: EngagementScoreProps = {
    score: '0', // default value
  };
  let [engagementScoreProps, SetEngagementScoreProps] =
    React.useState<EngagementScoreProps>(defaultEngagementScoreProps);

  return (
    <>
      <Stack>
        <EngagementScore score={engagementScoreProps?.score} />
      </Stack>
    </>
  );
}
