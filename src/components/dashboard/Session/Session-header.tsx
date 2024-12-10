'use client';

import * as React from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';

export function SessionHeader(): React.JSX.Element {
  const router = useRouter();
  const onAddSession = () => {
    router.push(paths.dashboard.Sessions.addInstution);
  };
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Session</Typography>
        </Stack>
        <div>
          <Button
            onClick={onAddSession}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
    </>
  );
}
