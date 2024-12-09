export interface Slot {
  uid: string;
  id?: string | null;
  title: string;
  date: string;
  time_from: string;
  time_to: string;
  engagement_score?: number | null;
  report: string;
  session_id?: string | null;
  trainer_id: string;
}

export interface Session {
  uid: string;
  trainer_ids: string[];
  name: string;
  no_of_slots: number;
}
