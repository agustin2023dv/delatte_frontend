// src/core/types/IAuthenticatedUser.ts
import {
    IUserRole,
    IUserBase,
    IUserProfile,
  } from '@delatte/shared/interfaces/User';
  
  /**
   * Representa al usuario autenticado en el frontend.
   * Contiene solo los campos necesarios para navegación y UI básica.
   */
  export interface IAuthenticatedUser {
    _id: string;
    role: IUserRole['role'];
    profile: IUserBase & IUserProfile;
  }
  