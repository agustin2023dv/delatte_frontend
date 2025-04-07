/**
 * Servicio que realiza el intercambio del authorization code de Google
 * por un access token válido, siguiendo el protocolo OAuth 2.0.
 *
 * 📌 Esta operación debe hacerse inmediatamente después de obtener el código
 * de autorización (`code`) tras el login exitoso con Google.
 *
 * 🔐 Retorna un `access_token` que luego puede enviarse al backend
 * para registrar o autenticar al usuario.
 */

// src/app/features/auth/services/oauthService.ts

export const exchangeCodeForToken = async (
  code: string,
  redirectUri: string,
  clientId: string,
  tokenEndpoint: string
): Promise<string> => {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    throw new Error('No se pudo obtener el token de acceso');
  }

  return data.access_token;
};
