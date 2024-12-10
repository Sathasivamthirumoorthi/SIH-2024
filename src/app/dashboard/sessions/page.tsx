import * as React from 'react';
import type { Metadata } from 'next';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Session } from '@/models/sessionsDetail';
import apiClient from '@/utils/api';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { SessionHeader } from '@/components/dashboard/session/session-header';
import { SessionTable } from '@/components/dashboard/session/session-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;
export const institutions: InstutionDetailsInterface[] = [
  {
    uid: '1',
    average_score: 89.5,
    name: 'Greenwood High',
    user_id: '1001',
    location: 'California, USA',
    status: 'poor',
  },
  {
    uid: '2',
    average_score: 92.0,
    name: 'Sunrise Academy',
    user_id: '1002',
    location: 'New York, USA',
    status: 'poor',
  },
  {
    uid: '3',
    average_score: 85.3,
    name: 'Hilltop Institute',
    user_id: '1003',
    location: 'Texas, USA',
    status: 'avarage',
  },
  {
    uid: '4',
    average_score: 78.9,
    name: 'Riverside School',
    user_id: '1004',
    location: 'Florida, USA',
    status: 'excellent',
  },
  {
    uid: '5',
    average_score: 94.7,
    name: 'Maple Leaf College',
    user_id: '1005',
    location: 'Toronto, Canada',
    status: 'avarage',
  },
] satisfies InstutionDetailsInterface[];

async function fetchSessions(): Promise<Session[]> {
  try {
    const response = await apiClient.get('/sessions');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch institutions:', error);
    throw new Error('Unable to fetch institutions');
  }
}

export default async function Page(): Promise<React.JSX.Element> {
  const sessions = await fetchSessions();

  const page = 0;
  const rowsPerPage = 6;

  const paginatedInstutions = applyPagination(sessions, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <SessionHeader />
      {/* <SessionFilters /> */}
      <SessionTable
        count={paginatedInstutions.length}
        page={page}
        rows={paginatedInstutions}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Session[], page: number, rowsPerPage: number): Session[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
