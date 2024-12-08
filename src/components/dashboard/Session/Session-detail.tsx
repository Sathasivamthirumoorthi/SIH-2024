'use client';

import * as React from 'react';
import { EngagementScoreProps } from '@/models/engagementScore';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Stack } from '@mui/system';

import { EngagementScore } from '../common/engagement-score';

interface InstutionDetailsProps {
  instutionId: string;
}
export function SessionDetails({ instutionId }: InstutionDetailsProps): React.JSX.Element {
  const defaultEngagementScoreProps: EngagementScoreProps = {
    score: '0', // default value
  };
  let [engagementScoreProps, SetEngagementScoreProps] =
    React.useState<EngagementScoreProps>(defaultEngagementScoreProps);
    
  React.useEffect(() => {
    console.log(instutionId);
    // api logic goes here 
    SetEngagementScoreProps({
      score: '22.22',
    });
  }, []);
  
  return (
    <>
      <Stack>
        <EngagementScore score={engagementScoreProps?.score} />
      </Stack>
    </>
  );
}
