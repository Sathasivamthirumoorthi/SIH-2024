import * as React from 'react';
import { EngagementScoreProps } from '@/models/engagementscore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';  
import Typography from '@mui/material/Typography';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
 
export function EngagementScore({ score, name }: EngagementScoreProps): React.JSX.Element {
  const TrendIcon = ArrowUpIcon;
  const trendColor = 'var(--mui-palette-success-main)';

  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {name}
              </Typography>
              <Typography variant="h4">{score + `%`}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
