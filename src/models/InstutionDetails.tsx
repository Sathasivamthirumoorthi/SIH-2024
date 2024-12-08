export interface InstutionDetailsInterface {
  id: string;
  average_score: number;
  name: string;
  user_id: string;
  location: string;
  status: 'poor' | 'avarage' | 'excellent';
}
