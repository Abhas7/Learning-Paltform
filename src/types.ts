export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'code' | 'quiz';
  content: string;
  solution?: string;
  points: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  completedChallenges: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  status: 'pending' | 'success' | 'failed';
  feedback?: string;
  timestamp: Date;
}