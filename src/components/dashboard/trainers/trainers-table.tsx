'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { TrainersDetailsInterface } from '@/models/TrainersDetails';
import { Button } from '@mui/material';
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

import { paths } from '@/paths';
import { useSelection } from '@/hooks/use-selection';
import { useUser } from '@/hooks/use-user';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  institution_id: string;
  sessions: string[];
  slots: string[];
}

interface TrainersTableProps {
  count?: number;
  page?: number;
  rows?: TrainersDetailsInterface[];
  rowsPerPage?: number;
}

export function TrainersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: TrainersTableProps): React.JSX.Element {
  const router = useRouter();
  const { user } = useUser();
  console.log(rows);
  const rowIds = React.useMemo(() => {
    return rows.map((trainer) => trainer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

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
              <TableCell>Email</TableCell>

              <TableCell>Sessions</TableCell>
              <TableCell>Slots</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected?.has(row.id) ?? false}
                    onChange={() => {
                      if (selected?.has(row.id)) {
                        deselectOne(row.id);
                      } else {
                        selectOne(row.id);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 32, height: 32 }}>{row.name.charAt(0)}</Avatar>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{Array.isArray(row.sessions) ? row.sessions.join(', ') : 'No sessions available'}</TableCell>
                <TableCell>{Array.isArray(row.slots) ? row.slots.join(', ') : 'No slots available'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
}
