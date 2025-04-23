/**
 * Hook `useOAuth`
 * 
 * Encapsula el flujo completo de autenticación con Google usando OAuth 2.0.
 *
 * ✔️ Abre el navegador para iniciar sesión con Google
 * ✔️ Recibe el authorization code y lo intercambia por un access token
 * ✔️ Devuelve el token y permite manejar la respuesta externamente
 * 
 * ☑️ Cumple principio SOLID: Open/Closed (extensible sin modificar)
 */

// src/shared/hooks/useOAuth.ts


import { useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { generateSecureState } from 'src/features/auth/services/cryptoService';
import { exchangeCodeForToken } from 'src/features/auth/services/oauthService';

const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? '';
const authorizationEndpoint = process.env.EXPO_PUBLIC_AUTHORIZATION_ENDPOINT ?? '';
const tokenEndpoint = process.env.EXPO_PUBLIC_TOKEN_ENDPOINT ?? '';

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'delatte',
  native: 'delatte:/oauthredirect',
});

const discovery = {
  authorizationEndpoint,
  tokenEndpoint,
};

/**
 * Hook que gestiona el flujo OAuth con Google.
 *
 * @param onSuccess Función que se ejecuta cuando se obtiene el access token correctamente
 */
export const useOAuth = (onSuccess?: (accessToken: string) => Promise<void>) => {
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
   * Inicia el flujo de autenticación abriendo el navegador de Google.
   */
  const startAuthentication = async () => {
    try {
      if (!request) {
        console.warn('⚠️ Solicitud OAuth no lista');
        return;
      }

      const secureState = await generateSecureState();
      request.state = secureState;
      await promptAsync();
    } catch (error) {
      console.error('❌ Error al iniciar autenticación OAuth:', error);
    }
  };

  /**
   * Cuando se obtiene el código de autorización:
   * - Intercambia por token
   * - Llama al callback onSuccess con ese token (externo al hook)
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

          if (onSuccess) {
            await onSuccess(token); 
          }
        } catch (err) {
          console.error('❌ Error en flujo OAuth:', err);
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
