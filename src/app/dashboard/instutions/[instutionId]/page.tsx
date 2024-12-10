import * as React from 'react';
import { redirect } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';
import apiClient from '@/utils/api';

import { AddInstitution } from '@/components/dashboard/instution/add-instution';
import { InstutionDetails } from '@/components/dashboard/instution/instution-detail';

const isValidInstitution = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

async function fetchInstitutions(instutionId: string): Promise<InstutionDetailsInterface> {
  try {
    const response = await apiClient.get(`/institutions/${instutionId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch institutions:', error);
    throw new Error('Unable to fetch institutions');
    // var instutionDetails: InstutionDetailsInterface;
    // return instutionDetails;
  }
}

export default async function instution({ params }: { params: { instutionId: string } }): Promise<React.JSX.Element> {
  const path: string = params.instutionId; // asdasd

  if (path === 'add') {
    return <AddInstitution />;
  }
  const institution = await fetchInstitutions(path);
  // if (!isValidInstitution(path)) {
  //   redirect('/404');
  // }
  return <InstutionDetails instution={institution} />;
}
