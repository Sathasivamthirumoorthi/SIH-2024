import * as React from 'react';
import type { Metadata } from 'next';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import apiClient from '@/utils/api';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import axios from 'axios';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { InstutionsFilters } from '@/components/dashboard/instution/instutions-filters';
import { InstutionsHeader } from '@/components/dashboard/instution/instutions-header';
import { InstutionsTable } from '@/components/dashboard/instution/instutions-table';

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

async function fetchInstitutions(): Promise<InstutionDetailsInterface[]> {
  try {
    const response = await apiClient.get('/institutions/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch institutions:', error);
    throw new Error('Unable to fetch institutions');
  }
}

export default async function Page(): Promise<React.JSX.Element> {
  const institutions = await fetchInstitutions();

  const page = 0;
  const rowsPerPage = 6;

  const paginatedInstutions = applyPagination(institutions, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <InstutionsHeader />
      {/* <InstutionsFilters /> */}
      <InstutionsTable
        count={paginatedInstutions.length}
        page={page}
        rows={paginatedInstutions}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(
  rows: InstutionDetailsInterface[],
  page: number,
  rowsPerPage: number
): InstutionDetailsInterface[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
