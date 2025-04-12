// app.config.js

import 'dotenv/config'; 

/** @type {import('@expo/webpack-config').ExpoConfig} */
export default () => {
  return {
    name: "delatte_frontend",
    slug: "delatte_frontend",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "delatte",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    platforms: ["android", "ios", "web"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.anonymous.delatte_frontend",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      // Variables disponibles en el frontend
      apiUrl: process.env.EXPO_PUBLIC_API_URL_WEB,
      frontendUrl: process.env.FRONTEND_URL_WEB,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUri: process.env.REDIRECT_URI,
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  };
};
