export type Language = 'es' | 'en' | 'fr';

export type AlertType = 'tormenta' | 'temporal' | 'voladora' | 'general';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface WeatherData {
  temp: number;
  windSpeed: number;
  condition: string;
  alerts: Alert[];
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'comedor' | 'gimnasio' | 'recreacion' | 'estacionamiento' | 'medico' | 'dormitorio' | 'oficina';
  description: string;
  coordinates: { x: number; y: number }; // Percentage based for a custom map view
}

export interface Camp {
  id: string;
  name: string;
  status: 'activo' | 'construccion';
  location: string;
  weather: WeatherData;
  mapLocations: MapLocation[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'operativo' | 'seguridad' | 'campamento';
}

export interface CampService {
  id: string;
  name: string;
  schedule: string;
  details: string;
  icon: string;
}

export interface ManualChapter {
  id: string;
  title: string;
  content: string;
}
