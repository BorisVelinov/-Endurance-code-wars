export interface CrewMember {
  id: string;
  name: string;
  role: string;
  description: string;
  detailedBio: string;
  skills: string[];
  image: string;
}

export interface SystemStatus {
  name: string;
  status: 'operational' | 'warning' | 'critical';
  value: number;
  unit: string;
}

export interface NavigationData {
  currentLocation: string;
  destination: string;
  distanceRemaining: number;
  estimatedTime: string;
}
