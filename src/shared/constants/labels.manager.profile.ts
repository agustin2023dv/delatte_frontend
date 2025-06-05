// src/shared/constants/labels.manager.profile.ts

export const MANAGER_PROFILE_TABS = {
    HOME : 'Home',
    PROFILE: 'Perfil',
    RESTAURANTS: 'Mis Restaurantes',
    PROMOTIONS: 'Mis Promociones',
    NOTIFICATIONS: 'Notificaciones',
    REVIEWS: 'Mis Reseñas',
    RESERVATIONS: 'Mis Reservas',
  } as const;
  
  export type ManagerProfileTabKey = keyof typeof MANAGER_PROFILE_TABS;
  