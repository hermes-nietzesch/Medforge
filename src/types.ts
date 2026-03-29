export type Screen = 'dashboard' | 'plan' | 'lab' | 'mentor' | 'progress';

export interface TimetableItem {
  time: string;
  title: string;
  description: string;
  type?: 'clinical' | 'study' | 'rest';
}

export interface SpecialtyConfidence {
  name: string;
  confidence: number;
  status: string;
  color: string;
}

export interface AnalysisResult {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: string[];
}
