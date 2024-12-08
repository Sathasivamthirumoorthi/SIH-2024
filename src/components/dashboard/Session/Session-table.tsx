'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  rowsPerPage?: number;
}

export function SessionTable({
  count: defaultCount = 0,
  page: defaultPage = 0,
  rowsPerPage: defaultRowsPerPage = 5,
}: SessionsTableProps): React.JSX.Element {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const rowIds = React.useMemo(() => sessions.map((session) => session.id), [sessions]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < sessions.length;
  const selectedAll = sessions.length > 0 && selected?.size === sessions.length;

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('https://sih-2024-backend-o83c.onrender.com/api/v1/sessions');
        setSessions(response.data); // Assuming response data is an array of sessions
      } catch (err: any) {
        setError(err.message || 'Failed to fetch sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  function onHandleViewDetails(id: string) {
    router.push(`${paths.dashboard.Session.overview}/${id}`);
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
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
            {sessions.map((session) => {
              const isSelected = selected?.has(session.id);

              return (
                <TableRow hover key={session.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(session.id);
                        } else {
                          deselectOne(session.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2">{session.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{session.institution_id}</TableCell>
                  <TableCell>{session.trainer_ids.join(', ')}</TableCell>
                  <TableCell>{session.no_of_slots}</TableCell>
                  <TableCell>{session.average_eng_score}</TableCell>
                  <TableCell>{session.slots.join(', ')}</TableCell>
                  <TableCell>
                    <Button onClick={() => onHandleViewDetails(session.id)} variant="contained">
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
        count={defaultCount || sessions.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={defaultPage}
        rowsPerPage={defaultRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}