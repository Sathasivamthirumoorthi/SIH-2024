import * as React from 'react';
import { redirect } from 'next/navigation';

import { type TrainersDetailsInterface } from '@/models/TrainersDetails';


import { AddTrainers } from '@/components/dashboard/trainers/add-trainer';
import apiClient from '@/utils/api';

const isValidTrainer = (id: string): boolean => {
  // Example validation - replace with your actual institution ID validation
  const validIds = ['1', '2', '3']; // Example valid IDs
  return validIds.includes(id);
};

async function fetchTrainers(trainerId: string): Promise<TrainersDetailsInterface[]> {
    try {
      const response = await apiClient.get(`/trainers/${trainerId}`);
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
      // throw new Error('Unable to fetch institutions');
      const trainerDetails: TrainersDetailsInterface[] = [];
      return trainerDetails;
    }
  }

export default function trainer({ params }: { params: { trainerId: string } }): React.JSX.Element {
  const path: string = params.trainerId; // asdasd
  if (path === 'add') {
    return <AddTrainers />;
  }
  
  
}
