'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';

export function TrainersHeader(): React.JSX.Element {
  const router = useRouter();

  const onAddTrainer = () => {
    router.push(paths.dashboard.trainers.addTrainer);
  };

  return (
    <Stack direction="row" spacing={3}>
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Trainers</Typography>
      </Stack>
      <div>
        <Button
          onClick={onAddTrainer}
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Add
        </Button>
      </div>
    </Stack>
  );
}
