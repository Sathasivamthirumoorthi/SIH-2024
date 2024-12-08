// src/app/dashboard/page.tsx

import * as React from 'react';
import { Grid } from '@mui/material';
import { EngagementCard } from '../../components/dashboard/overview/engagement';  // Adjusted the import path

export default function Page(): React.JSX.Element {
  // Example data, you can fetch these values from an API or state management
  const isRegulatoryBody = true;  // Flag to determine entity type (regulatory or institution)
  const name = isRegulatoryBody ? 'Anna University' : 'KGiSL Institute of Technology';
  const engagementScore = 88.45;  // Example engagement score value

  return (
    <Grid container spacing={3}>
      <Grid lg={13} sm={12} xs={12}>
        {/* Pass the necessary props to the EngagementCard component */}
        <EngagementCard 
          type={isRegulatoryBody ? 'regulatory' : 'institution'}
          name={name}
          engagementScore={engagementScore}
        />
      </Grid>
    </Grid>
  );
}
