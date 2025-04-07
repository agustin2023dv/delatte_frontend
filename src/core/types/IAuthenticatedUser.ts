/**
 * 🧾 Representación mínima del usuario autenticado en el frontend.
 * 
 * Esta interfaz define únicamente los datos necesarios para controlar la sesión del usuario,
 * renderizar su información en la UI y validar permisos según su rol.
 * 
 * 👉 Se utiliza principalmente en el contexto de autenticación (AuthContext) y navegación condicional.
 */


// src/core/types/IAuthenticatedUser.ts

import {
  IUserRole,
  IUserBase,
  IUserProfile,
} from '@delatte/shared/interfaces';

export interface IAuthenticatedUser {
  _id: string;                                 // ID único del usuario (desde la base de datos)
  role: IUserRole['role'];                     // Rol del usuario: customer | manager | superadmin
  profile: IUserBase & IUserProfile;           // Información de perfil: nombre, email, foto, etc.
}
