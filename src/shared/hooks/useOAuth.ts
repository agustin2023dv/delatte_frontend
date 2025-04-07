/**
 * Hook `useOAuth`
 * 
 * Encapsula el flujo completo de autenticación con Google usando OAuth 2.0,
 * desde la solicitud inicial hasta la integración con el backend de la app.
 *
 * ✔️ Abre el navegador para iniciar sesión con Google.
 * ✔️ Recibe el authorization code y lo intercambia por un token de acceso.
 * ✔️ Envía ese token al backend de Delatte para autenticar al usuario.
 * ✔️ Actualiza el contexto global de sesión y persiste el JWT.
 *
 * Este hook es reutilizable en cualquier pantalla o componente donde se requiera
 * iniciar sesión o registrarse con Google.
 */

// src/app/shared/hooks/useOAuth.ts

import { useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { generateSecureState } from '../../app/features/auth/services/cryptoService';
import { exchangeCodeForToken } from '../../app/features/auth/services/oauthService';
import { useGoogleUserService } from '../../app/features/auth/services/googleUserService';

/**
 * Configuración de endpoints de Google OAuth 2.0.
 * Los valores provienen de variables de entorno públicas de Expo.
 */
const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? '';
const authorizationEndpoint = process.env.EXPO_PUBLIC_AUTHORIZATION_ENDPOINT ?? '';
const tokenEndpoint = process.env.EXPO_PUBLIC_TOKEN_ENDPOINT ?? '';

/**
 * Redireccionamiento válido para apps móviles.
 * - `scheme`: definido en `app.json` (ej: delatte)
 * - `native`: usado en Android/iOS para redirigir de vuelta a la app.
 */
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'delatte',
  native: 'delatte:/oauthredirect',
});

/**
 * Estructura requerida por `useAuthRequest` para conocer los endpoints de Google.
 */
const discovery = {
  authorizationEndpoint,
  tokenEndpoint,
};

/**
 * Hook personalizado que encapsula todo el flujo de OAuth con Google:
 * - Solicitud segura
 * - Intercambio de código por token
 * - Envío del token al backend
 * - Actualización de sesión global
 */
export const useOAuth = () => {
  const { authenticateWithGoogle } = useGoogleUserService(); // 🔗 Comunicación con backend propio

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    discovery
  );

  /**
   * Inicia el flujo de OAuth con Google, generando un `state` seguro.
   */
  const startAuthentication = async () => {
    try {
      if (!request) {
        console.warn('⚠️ Solicitud OAuth no lista');
        return;
      }

      const secureState = await generateSecureState();
      request.state = secureState;

      await promptAsync(); // Abre navegador para login
    } catch (error) {
      console.error('❌ Error al iniciar autenticación OAuth:', error);
    }
  };

  /**
   * Cuando se obtiene el código de autorización, se realiza:
   * 1. Intercambio por token de acceso de Google.
   * 2. Autenticación con backend (`/auth/google`).
   * 3. Guardado del token + actualización del contexto global.
   */
  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === 'success' && response.params?.code) {
        try {
          const token = await exchangeCodeForToken(
            response.params.code,
            redirectUri,
            clientId,
            tokenEndpoint
          );

          setAccessToken(token);

          // 🔄 Se comunica con backend y actualiza estado global
          await authenticateWithGoogle(token);
        } catch (err) {
          console.error('❌ Error completo en flujo OAuth:', err);
        }
      }
    };

    handleAuthResponse();
  }, [response]);
  
  return {
    accessToken,
    isAuthenticated: !!accessToken,
    startAuthentication,
  };
};
