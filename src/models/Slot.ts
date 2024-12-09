// models/Slot.ts
export interface slot {
  id: string;
  title: string;
  date: string;
  time_from: string;
  time_to: string;
  engagement_score: number;
  report?: string;
  session_id: string;
  trainer_id: string;
}
