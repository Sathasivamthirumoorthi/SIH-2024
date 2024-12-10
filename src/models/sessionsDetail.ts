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
  average_eng_score: number;
  slots: string[];
}

export interface ViewSlot {
  uid?: string;
  title?: string;
  date?: string;
  time_from?: string;
  time_to?: string;
  engagement_score?: number | null;
}

export interface ViewSlotProps {
  viewSlot: ViewSlot[];
}

export interface AddSlot {
  title: string;
  date: string;
  time_from: string;
  time_to: string;
  trainer_id: string;
}

export interface AddSession {
  trainer_ids: string[]; // Array of trainer IDs
  institution_id: string; // Institution ID
  name: string; // Name of the session
  no_of_slots: number; // Number of slots available
  slots: AddSlot[]; // Array of slot details
}
