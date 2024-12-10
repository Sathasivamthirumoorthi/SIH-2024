'use client';

import * as React from 'react';
import { Session, Slot, ViewSlot } from '@/models/sessionsDetail';
import { slot } from '@/models/Slot';
import { Trainers } from '@/models/TrainersDetails';
import apiClient from '@/utils/api';
import { Stack, Typography } from '@mui/material';

import CustomizedAccordions from '../common/accordion';
import { EngagementScore } from '../common/engagement-score';

interface SessionDetailsProps {
  session: Session;
}

export function SessionDetails({ session }: SessionDetailsProps): React.JSX.Element {
  console.log('got value', session);
  const [trainers, setTrainers] = React.useState<Trainers[]>([]);
  const [slots, setSlots] = React.useState<ViewSlot[]>([]);
  const [Oes, setOes] = React.useState(0);
  const trainersRef = React.useRef<Trainers[]>([]);
  const slotsRef = React.useRef<ViewSlot[]>([]);

  React.useEffect(() => {
    const fetchTrainerDetails = async () => {
      const trainerDetailsPromises = session.trainer_ids.map(async (trainerId) => {
        const trainerDetail = await apiClient.get(`trainers/${trainerId}`);
        return trainerDetail.data;
      });

      const trainerDetails = await Promise.all(trainerDetailsPromises);

      // Avoid unnecessary updates
      const uniqueTrainers = trainerDetails.filter(
        (trainer) => !trainersRef.current.some((t) => t.name === trainer.name)
      );

      trainersRef.current = [...trainersRef.current, ...uniqueTrainers];
      setTrainers(trainersRef.current);
    };
    const fetchSlotDetails = async () => {
      const slotDetailsPromises = session.slots.map(async (slotId) => {
        const slotDetail = await apiClient.get(`slots/${session.uid}`);
        return slotDetail.data; // Adjust this based on the API response structure
      });

      // Await all promises
      const slotDetails = await Promise.all(slotDetailsPromises);
      console.log(slotDetails);
      // Filter out duplicate slots based on unique properties (e.g., title, date, etc.)
      const uniqueSlots = slotDetails.filter(
        (slot, index, self) => index === self.findIndex((s) => s.title === slot.title && s.date === slot.date)
      );

      // Avoid unnecessary updates
      slotsRef.current = [...slotsRef.current, ...uniqueSlots];
      setSlots(slotsRef.current);
    };
    const fetchOverallSessionEngagementScore = async () => {
      try {
        const overallSessionEngagementScore = await apiClient.get(`/sessions/${session.uid}/engagement`);
        setOes(overallSessionEngagementScore.data.average_engagement_score);
      } catch (error) {}
    };

    fetchTrainerDetails();
    fetchSlotDetails();
    fetchOverallSessionEngagementScore();
  }, [session.trainer_ids, session.slots]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight="bold">
        Session Details
      </Typography>
      <Typography variant="h5">
        <strong>Session Name:</strong> {session.name}
      </Typography>
      {/* Display Slot Details */}
      <Stack spacing={1} sx={{ marginBottom: '40px' }}>
        {trainers.length === 1 ? (
          <Typography variant="h5">
            <strong>Trainer Name:</strong> {trainers[0].name}
          </Typography>
        ) : trainers.length > 1 ? (
          <Typography variant="h5">
            <strong>Trainers Names:</strong> {trainers.map((t) => t.name).join(', ')}
          </Typography>
        ) : (
          <Typography variant="h5">
            <strong>No Trainers Available</strong>
          </Typography>
        )}
        <EngagementScore
          name="Avarage Engagement score of slots"
          score={Oes === null ? JSON.stringify(0) : JSON.stringify(Oes)}
        />
        {/* {slotDetails.report && (
          <Typography variant="body2" color="textSecondary">
            <strong>Report:</strong> 
          </Typography>
        )} */}
        <CustomizedAccordions viewSlot={slots} />
      </Stack>
    </Stack>
  );
}
