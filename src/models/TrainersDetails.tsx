export interface TrainersDetailsInterface {
    id: string;
    average_score: number;
    name: string;
    user_id: string;
    email: string;
   
    
  }
  export interface AddTrainerRequest {
    name: string;
    
    email: string;
  }