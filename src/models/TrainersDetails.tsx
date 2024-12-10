export interface TrainersDetailsInterface {
  id: string;
  average_score: number;
  name: string;
  user_id: string;
  email: string;
  sessions?: string;
  slots?: string;
  institution_id?: string;
}
export interface AddTrainerRequest {
  name: string;
  email: string;
  institution_id?: string;
}

export interface Trainers {
  name: string;
}
