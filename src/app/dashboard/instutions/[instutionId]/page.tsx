import * as React from 'react';
import { redirect } from 'next/navigation';

import { AddInstitution } from '@/components/dashboard/instution/add-instution';

const isValidInstitution = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

export default function instution({ params }: { params: { instutionId: string } }): React.JSX.Element {
  const path = params.instutionId;
  if (path === 'add') {
    return <AddInstitution />;
  }
  if (!isValidInstitution(path)) {
    redirect('/404');
  }
  return <div>Institution Details for ID: {path}</div>;
}
