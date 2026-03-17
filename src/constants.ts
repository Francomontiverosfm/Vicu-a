import { ManualChapter, NewsItem, CampService, Camp } from './types';

export const CAMPS: Camp[] = [
  {
    id: 'batidero',
    name: 'Batidero',
    status: 'activo',
    location: 'Zona Norte',
    weather: {
      temp: 12,
      windSpeed: 45,
      condition: 'Nublado',
      alerts: [
        { id: 'a1', type: 'temporal', title: 'Alerta de Temporal', message: 'Se esperan ráfagas superiores a 80km/h.', severity: 'high', timestamp: '2024-05-21T10:00:00Z' }
      ]
    },
    mapLocations: [
      { id: 'b1', name: 'Comedor Principal', type: 'comedor', description: 'Módulo C-1', coordinates: { x: 20, y: 30 } },
      { id: 'b2', name: 'Gimnasio', type: 'gimnasio', description: 'Módulo G-2', coordinates: { x: 50, y: 20 } },
      { id: 'b3', name: 'Estacionamiento Livianos', type: 'estacionamiento', description: 'Sector P-1', coordinates: { x: 80, y: 70 } },
      { id: 'b4', name: 'Sala de Recreación', type: 'recreacion', description: 'Módulo R-1', coordinates: { x: 30, y: 60 } }
    ]
  },
  {
    id: 'la-brea',
    name: 'La Brea',
    status: 'activo',
    location: 'Zona Este',
    weather: {
      temp: 15,
      windSpeed: 15,
      condition: 'Despejado',
      alerts: []
    },
    mapLocations: [
      { id: 'lb1', name: 'Comedor La Brea', type: 'comedor', description: 'Módulo Central', coordinates: { x: 40, y: 40 } },
      { id: 'lb2', name: 'Estacionamiento Equipos', type: 'estacionamiento', description: 'Sector Norte', coordinates: { x: 10, y: 10 } }
    ]
  },
  {
    id: 'la-guanaca',
    name: 'La Guanaca',
    status: 'activo',
    location: 'Zona Sur',
    weather: {
      temp: 10,
      windSpeed: 30,
      condition: 'Tormenta Eléctrica',
      alerts: [
        { id: 'a2', type: 'tormenta', title: 'Tormenta Eléctrica', message: 'Actividad eléctrica detectada. Suspender trabajos en altura.', severity: 'high', timestamp: '2024-05-21T11:30:00Z' },
        { id: 'a3', type: 'voladora', title: 'Riesgo de Voladoras', message: 'Asegurar materiales livianos en zona de acopio.', severity: 'medium', timestamp: '2024-05-21T11:45:00Z' }
      ]
    },
    mapLocations: [
      { id: 'lg1', name: 'Comedor Sur', type: 'comedor', description: 'Módulo S-1', coordinates: { x: 25, y: 25 } },
      { id: 'lg2', name: 'Centro Médico', type: 'medico', description: 'Módulo M-1', coordinates: { x: 75, y: 25 } },
      { id: 'lg3', name: 'Estacionamiento General', type: 'estacionamiento', description: 'Sector P-Sur', coordinates: { x: 50, y: 80 } }
    ]
  },
  {
    id: 'vicuna-const',
    name: 'Campamento Vicuña',
    status: 'construccion',
    location: 'Zona Central',
    weather: {
      temp: 14,
      windSpeed: 20,
      condition: 'Parcialmente Nublado',
      alerts: []
    },
    mapLocations: [
      { id: 'vc1', name: 'Oficinas de Obra', type: 'oficina', description: 'Módulo O-1', coordinates: { x: 50, y: 50 } },
      { id: 'vc2', name: 'Comedor Provisorio', type: 'comedor', description: 'Módulo CP-1', coordinates: { x: 20, y: 80 } }
    ]
  }
];

export const MANUAL_CHAPTERS: ManualChapter[] = [
  {
    id: '1',
    title: 'Introducción al Proyecto Vicuña',
    content: 'El Proyecto Vicuña es una iniciativa minera de clase mundial ubicada en la provincia de San Juan, Argentina. Este manual detalla los protocolos operativos y de seguridad...'
  },
  {
    id: '2',
    title: 'Protocolos de Seguridad en Terreno',
    content: 'La seguridad es nuestra prioridad número uno. Todos los trabajadores deben portar su EPP completo: casco, guantes, botas con punta de acero y protección ocular...'
  },
  {
    id: '3',
    title: 'Gestión Ambiental',
    content: 'Estamos comprometidos con la minería sustentable. El manejo de residuos se realiza bajo estrictas normas internacionales...'
  }
];

export const CAMP_SERVICES: CampService[] = [
  {
    id: '1',
    name: 'Comedor Central',
    schedule: 'Desayuno: 06:00 - 08:00 | Almuerzo: 12:00 - 14:00 | Cena: 19:00 - 21:00',
    details: 'Menú variado con opciones vegetarianas y para celíacos.',
    icon: 'Utensils'
  },
  {
    id: '2',
    name: 'Gimnasio y Recreación',
    schedule: 'Abierto: 05:00 - 23:00',
    details: 'Equipamiento completo, canchas de fútbol y sala de juegos.',
    icon: 'Dumbbell'
  },
  {
    id: '3',
    name: 'Servicio Médico',
    schedule: '24 Horas',
    details: 'Atención de emergencias y consultas generales en el módulo A-12.',
    icon: 'Stethoscope'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nueva Fase de Exploración Iniciada',
    date: '2024-05-20',
    content: 'Se ha dado inicio a la fase 3 de perforación en el sector norte del yacimiento.',
    category: 'operativo'
  },
  {
    id: '2',
    title: 'Record de Seguridad: 500 Días sin Accidentes',
    date: '2024-05-18',
    content: 'Felicitamos a todo el equipo por mantener los estándares de seguridad más altos.',
    category: 'seguridad'
  }
];

export const TRANSLATIONS = {
  es: {
    welcome: 'Bienvenido al Proyecto Vicuña',
    subtitle: 'Plataforma Informativa Operativa',
    modules: {
      manual: 'Manual del Proyecto',
      weather: 'Clima y Alertas',
      services: 'Servicios del Campamento',
      news: 'Novedades',
      search: 'Buscador Inteligente',
      camps: 'Dashboard de Campamentos',
      map: 'Mapa del Campamento'
    },
    searchPlaceholder: 'Escribe tu pregunta sobre el proyecto...',
    weatherTitle: 'Condiciones Climáticas',
    temp: 'Temperatura',
    wind: 'Viento',
    alerts: 'Alertas Activas',
    back: 'Volver',
    loading: 'Cargando...',
    login: 'Iniciar Sesión',
    user: 'Usuario',
    pass: 'Contraseña',
    campStatus: {
      activo: 'Operativo',
      construccion: 'En Construcción'
    }
  },
  en: {
    welcome: 'Welcome to Vicuña Project',
    subtitle: 'Operational Information Platform',
    modules: {
      manual: 'Project Manual',
      weather: 'Weather & Alerts',
      services: 'Camp Services',
      news: 'News & Updates',
      search: 'Smart Search',
      camps: 'Camps Dashboard'
    },
    searchPlaceholder: 'Type your question about the project...',
    weatherTitle: 'Weather Conditions',
    temp: 'Temperature',
    wind: 'Wind',
    alerts: 'Active Alerts',
    back: 'Back',
    loading: 'Loading...',
    login: 'Login',
    user: 'Username',
    pass: 'Password',
    campStatus: {
      activo: 'Operational',
      construccion: 'Under Construction'
    }
  },
  fr: {
    welcome: 'Bienvenue au Projet Vicuña',
    subtitle: 'Plateforme d\'Information Opérationnelle',
    modules: {
      manual: 'Manuel du Projet',
      weather: 'Météo et Alertes',
      services: 'Services du Camp',
      news: 'Nouvelles',
      search: 'Recherche Intelligente',
      camps: 'Tableau des Camps'
    },
    searchPlaceholder: 'Posez votre question sur le proyecto...',
    weatherTitle: 'Conditions Météorologiques',
    temp: 'Température',
    wind: 'Vent',
    alerts: 'Alertes Actives',
    back: 'Retour',
    loading: 'Chargement...',
    login: 'Connexion',
    user: 'Utilisateur',
    pass: 'Mot de passe',
    campStatus: {
      activo: 'Opérationnel',
      construccion: 'En Construction'
    }
  }
};
