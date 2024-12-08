import * as React from 'react';
import { redirect } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';

import { AddInstitution } from '@/components/dashboard/instution/add-instution';
import { InstutionDetails } from '@/components/dashboard/instution/instution-detail';

const isValidInstitution = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

export default function instution({ params }: { params: { instutionId: string } }): React.JSX.Element {
  const path: string = params.instutionId; // asdasd
  if (path === 'add') {
    return <AddInstitution />;
  }
  // if (!isValidInstitution(path)) {
  //   redirect('/404');
  // }
  return <InstutionDetails instutionId={path} />;
}
