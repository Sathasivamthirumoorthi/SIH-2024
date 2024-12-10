import * as React from 'react';
import type { Metadata } from 'next';
import { TrainersDetailsInterface } from '@/models/TrainersDetails';
import apiClient from '@/utils/api';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import axios from 'axios';

import { config } from '@/config';

import { TrainersFilters } from '@/components/dashboard/trainers/trainers-filters';
import { TrainersHeader } from '@/components/dashboard/trainers/trainers-header';
import { TrainersTable } from '@/components/dashboard/trainers/trainers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;
export const trainers: TrainersDetailsInterface[] = [
    {
        id: '1',
        name: 'Alcides Antonio',
        average_score: 89.5,
        user_id: '1001',
        email: 'alcides.antonio@devias.io',
      },
      {
        id: '2',
        name: 'Marcus Finn',
        average_score: 92.0,
        user_id: '1002',
        email: 'marcus.finn@devias.io',
      },
      {
        id: 'USR-008',
        name: 'Jie Yan',
        average_score: 85.3,
        user_id: '1003',
        email: 'jie.yan.song@devias.io',
      },
      {
        id: 'USR-007',
        name: 'Nasimiyu Danai',
        average_score: 78.9,
        user_id: '1004',
        email: 'nasimiyu.danai@devias.io',
      },
      {
        id: 'USR-006',
        name: 'Iulia Albu',
        average_score: 94.7,
        user_id: '1005',
        email: 'iulia.albu@devias.io',
      },
] satisfies TrainersDetailsInterface[];

async function fetchTrainers(): Promise<TrainersDetailsInterface[]> {
    try {
      const response = await apiClient.get('/trainers/');
      
      return response.data;
    } catch (error) {
     
      throw new Error('Unable to fetch trainers');
    }
  }

  export default async function Page(): Promise<React.JSX.Element> {
    const trainers = await fetchTrainers();
  const page = 0;
  const rowsPerPage = 6;

  const paginatedTrainers = applyPagination(trainers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <TrainersHeader />
      {/* <TrainersFilters /> */}
      <TrainersTable
        count={paginatedTrainers.length}
        page={page}
        rows={paginatedTrainers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(
  rows: TrainersDetailsInterface[],
  page: number,
  rowsPerPage: number
): TrainersDetailsInterface[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
