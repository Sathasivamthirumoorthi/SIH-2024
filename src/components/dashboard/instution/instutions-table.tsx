'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Button, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { paths } from '@/paths';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}
const statusMap = {
  poor: { label: 'Poor', color: 'error' },
  avarage: { label: 'Avarage', color: 'warning' },
  excellent: { label: 'Excellent', color: 'success' },
} as const;

interface InstutionsTableProps {
  count?: number;
  page?: number;
  rows?: InstutionDetailsInterface[];
  rowsPerPage?: number;
}
// instution table
export function InstutionsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: InstutionsTableProps): React.JSX.Element {
  console.log(rows);
  const router = useRouter();
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.uid);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  function onHandleViewDetails(id: string) {
    console.log(id);
    router.push(paths.dashboard.instutions.overview + `/${id}`);
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.uid);
              const { label, color } = statusMap[row.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={row.uid} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.uid);
                        } else {
                          deselectOne(row.uid);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Button onClick={() => onHandleViewDetails(row.uid)} variant="contained">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
