'use client';

import React, { use, useEffect } from 'react';
import apiClient from '@/utils/api';
import { Grid, Typography } from '@mui/material';

import { useUser } from '@/hooks/use-user';

import { Traffic } from '../overview/traffic';

export default function DashboardCommon(): React.JSX.Element {
  const { user } = useUser();
  const [Oes, setOes] = React.useState(0);
  const [OverallInstitution, setOverallInstitution] = React.useState<any>();

  useEffect(() => {
    if (user?.role === 'institution') {
      //GET
      const fetchInstitutionEngagementScore = async () => {
        try {
          const OverallInstitution = await apiClient.get(`/institutions/${user.instutionId}/engagement`);
          console.log('asdasdas,', OverallInstitution);
          setOes(OverallInstitution.data.average_engagement_score);
        } catch (error) {}
      };
      fetchInstitutionEngagementScore();
    } else {
      //insights
      const fetchOverallInstitutionEngagementScore = async () => {
        try {
          const OverallInstitution = await apiClient.get(`/insights`);
          console.log('asdasdas,', OverallInstitution);
          setOverallInstitution(OverallInstitution.data);
          setOes(OverallInstitution.data.overall_average_engagement_score);
        } catch (error) {}
      };
      fetchOverallInstitutionEngagementScore();
    }
  }, []);

  return (
    <>
      {user?.role === 'regulatoryBody' ? (
        <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
          <Grid item lg={8} xs={12}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Welcome: {user.email}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Number of sessions: {OverallInstitution?.num_sessions}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Number of institutions: {OverallInstitution?.num_institutions}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Number of trainers: {OverallInstitution?.num_trainers}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Number of slots: {OverallInstitution?.num_slots}
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Traffic
              chartSeries={[Oes, 100 - Oes]}
              labels={['OES Score', 'Remaining']}
              sx={{ height: '100%' }}
              name={Oes + '%'}
              title="Overall Engagement Score of all institutions"
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
            <Grid lg={8} xs={12}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Welcome: {user?.email}
              </Typography>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
              <Traffic
                chartSeries={[Oes, 100 - Oes]}
                labels={['OES Score', 'Remaining']}
                sx={{ height: '100%' }}
                name={Oes + '%'}
                title="Overall Engagement Score of institutions"
              />{' '}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
