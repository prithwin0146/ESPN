export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  color: string;
}
