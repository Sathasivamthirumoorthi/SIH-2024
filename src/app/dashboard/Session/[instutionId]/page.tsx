import * as React from 'react';
import { redirect } from 'next/navigation';
import { InstutionDetailsInterface } from '@/models/InstutionDetails';

import { AddSession } from '@/components/dashboard/Session/add-Session';
import { SessionDetails } from '@/components/dashboard/Session/Session-detail';

const isValidInstitution = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

export default function instution({ params }: { params: { instutionId: string } }): React.JSX.Element {
  const path: string = params.instutionId; // asdasd
  if (path === 'add') {
    return <AddSession />;
  }
  // if (!isValidInstitution(path)) {
  //   redirect('/404');
  // }
  return <SessionDetails instutionId={path} />;
}
