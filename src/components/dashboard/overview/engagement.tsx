// src/components/dashboard/overview/engagement.tsx

import * as React from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';

export interface EngagementProps {
  type: 'regulatory' | 'institution';  // Type of entity (Regulatory or Institution)
  name: string;  // Name of the entity (Regulatory Body or Institution)
  engagementScore: number;  // Engagement score value
}

export function EngagementCard({ type, name, engagementScore }: EngagementProps): React.JSX.Element {
  return (
    <Card sx={{ height: '100%', boxShadow: 3 }}> {/* Increased size of the card */}
      <CardContent>
        <Stack spacing={3}>
          {/* Conditional Rendering for Welcome Message */}
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography
                color="text.primary"
                variant="h4"  // Making the text bigger and bold
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                {`Welcome, ${name}`}
              </Typography>
            </Stack>
          </Stack>

          {/* Conditional Rendering for Engagement Score */}
          {type === 'institution' && (
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
              <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
                <CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <Stack spacing={0.5}>
                <Typography variant="body2">Engagement Score:</Typography>
                <Typography variant="h4">{engagementScore}</Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
