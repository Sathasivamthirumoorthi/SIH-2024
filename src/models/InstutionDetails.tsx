export interface InstutionDetailsInterface {
  id: string;
  average_score: Number;
  name: string;
  user_id: string;
  location: string;
  status: 'poor' | 'avarage' | 'excellent';
}
