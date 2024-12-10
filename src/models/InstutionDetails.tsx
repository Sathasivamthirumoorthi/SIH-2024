export interface InstutionDetailsInterface {
  uid: string;
  average_score: Number;
  name: string;
  user_id: string;
  location: string;
  status: 'poor' | 'avarage' | 'excellent';
  sessions?: string[];
  // train : string[
  trainers?: string[];
}

export interface AddInstitutionRequest {
  name: string;
  location: string;
  email: string;
}
