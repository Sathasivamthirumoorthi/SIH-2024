'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/models/sessionsDetail';
import apiClient from '@/utils/api';
import { Button } from '@mui/material';
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

import { paths } from '@/paths';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}
interface SessionsTableProps {
  rows?: Session[];
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

export function SessionTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: SessionsTableProps): React.JSX.Element {
  console.log(rows);
  const router = useRouter();
  const rowIds = React.useMemo(() => {
    return rows.map((session) => session.uid);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  function onHandleViewDetails(id: string) {
    router.push(`${paths.dashboard.Sessions.overview}/${id}`);
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '1000px' }}>
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
              {/* <TableCell>Trainer IDs</TableCell>   */}
              <TableCell>Number of Slots</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((session) => {
              const isSelected = selected?.has(session.uid);

              return (
                <TableRow hover key={session.uid} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(session.uid);
                        } else {
                          deselectOne(session.uid);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2">{session.name}</Typography>
                    </Stack>
                  </TableCell>
                  {/* <TableCell>{session.trainer_ids.join(', ')}</TableCell> */}
                  <TableCell>{session.no_of_slots}</TableCell>
                  <TableCell>
                    <Button onClick={() => onHandleViewDetails(session.uid)} variant="contained">
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
