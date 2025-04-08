/**
 *
 * 🔁 Transformer `toAuthenticatedUser`
 *
 * Convierte un objeto `IUser` completo recibido desde el backend
 * en un objeto `IAuthenticatedUser` usable por el frontend (AuthContext, navegación, etc).
 *
 * ✔️ Convierte `_id` de ObjectId a string
 * ✔️ Extrae y adapta el perfil del usuario
 * ✔️ Garantiza compatibilidad con el modelo de sesión del frontend
 */

//shared/transformers/userTransformer.ts

import { IUser } from '@delatte/shared/interfaces';
import { IAuthenticatedUser } from 'src/core/types/IAuthenticatedUser';

/**
 * Transforma un `IUser` completo en un `IAuthenticatedUser` simplificado.
 *
 * @param user Objeto de usuario recibido desde el backend
 * @returns Objeto compatible con AuthContext
 */
export const toAuthenticatedUser = (user: IUser): IAuthenticatedUser => ({
  _id: user._id.toString(),
  role: user.role,
  profile: {
    nombre: user.profile.nombre,
    apellido: user.profile.apellido,
    email: user.profile.email,
    phone: user.profile.phone,
    dob: user.profile.dob,
    addresses: user.profile.addresses,
    profileImage: user.profile.profileImage, // puede ser undefined
  },
});
