'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

// Updated Session interface to reflect new Session model structure
export interface Session {
  id: string;
  trainer_ids: string[];
  institution_id: string;
  name: string;
  no_of_slots: number;
  average_eng_score: number;
  slots: string[];
}

interface SessionsTableProps {
  count?: number;
  page?: number;
  rows?: Session[];
  rowsPerPage?: number;
}

// Hardcoded session data for demonstration
const hardcodedSessions: Session[] = [
  {
    id: '1',
    trainer_ids: ['Trainer01', 'Trainer02'],
    institution_id: 'Institution01',
    name: 'Session A',
    no_of_slots: 5,
    average_eng_score: 85.5,
    slots: ['Slot1', 'Slot2', 'Slot3'],
  },
  {
    id: '2',
    trainer_ids: ['Trainer03'],
    institution_id: 'Institution02',
    name: 'Session B',
    no_of_slots: 3,
    average_eng_score: 78.2,
    slots: ['Slot1', 'Slot2'],
  },
  {
    id: '3',
    trainer_ids: ['Trainer04', 'Trainer05', 'Trainer06'],
    institution_id: 'Institution03',
    name: 'Session C',
    no_of_slots: 6,
    average_eng_score: 92.4,
    slots: ['Slot1', 'Slot2', 'Slot3', 'Slot4'],
  },
];

export function SessionTable({
  count = hardcodedSessions.length,
  rows = hardcodedSessions,
  page = 0,
  rowsPerPage = 5,
}: SessionsTableProps): React.JSX.Element {
  const router = useRouter();

  const rowIds = React.useMemo(() => rows.map((session) => session.id), [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  function onHandleViewDetails(id: string) {
    console.log(id);
    router.push(paths.dashboard.Session.overview + `/${id}`);
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
              <TableCell>Institution</TableCell>
              <TableCell>Trainer IDs</TableCell>
              <TableCell>Number of Slots</TableCell>
              <TableCell>Average English Score</TableCell>
              <TableCell>Slots</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.institution_id}</TableCell>
                  <TableCell>{Array.isArray(row.trainer_ids) ? row.trainer_ids.join(', ') : 'N/A'}</TableCell>
                  <TableCell>{row.no_of_slots}</TableCell>
                  <TableCell>{row.average_eng_score}</TableCell>
                  <TableCell>{Array.isArray(row.slots) ? row.slots.join(', ') : 'N/A'}</TableCell>
                  <TableCell>
                    <Button onClick={() => onHandleViewDetails(row.id)} variant="contained">
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
