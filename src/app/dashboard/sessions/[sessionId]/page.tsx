import * as React from 'react';
import { redirect } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Session } from '@/models/sessionsDetail';
import apiClient from '@/utils/api';

import { AddSession } from '@/components/dashboard/session/add-Session';
import { SessionDetails } from '@/components/dashboard/session/session-detail';

async function fetchSession(sessionId: string): Promise<Session> {
  try {
    const response = await apiClient.get(`/sessions/${sessionId}`);
    console.log('dataaaaa', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    throw new Error('Unable to fetch sessions');
  }
}

export default async function session({ params }: { params: { sessionId: string } }): Promise<React.JSX.Element> {
  const path: string = params.sessionId; // asdasd
  if (path === 'add') {
    return <AddSession />;
  }
  const fetchSessionMemoized = await React.useMemo(() => fetchSession(path), [path]);

  // if (!isValidInstitution(path)) {
  //   redirect('/404');
  // }
  if (fetchSessionMemoized) {
    return <SessionDetails session={fetchSessionMemoized} />;
  }
  return <></>;
}
