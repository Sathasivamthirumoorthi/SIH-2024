import * as React from 'react';
import { redirect } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import { Session } from '@/models/sessionsDetail';
import apiClient from '@/utils/api';

import { AddSession } from '@/components/dashboard/Session/add-Session';
import { SessionDetails } from '@/components/dashboard/Session/Session-detail';

const isValidInstitution = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

async function fetchSession(sessionId: string): Promise<Session> {
  try {
    const response = await apiClient.get(`/sessions/${sessionId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch institutions:', error);
    throw new Error('Unable to fetch institutions');
  }
}

export default async function instution({ params }: { params: { sessionId: string } }): Promise<React.JSX.Element> {
  const path: string = params.sessionId; // asdasd
  if (path === 'add') {
    return <AddSession />;
  }
  const sessions = await fetchSession(path);
  // if (!isValidInstitution(path)) {
  //   redirect('/404');
  // }
  return <SessionDetails session={sessions} />;
}
