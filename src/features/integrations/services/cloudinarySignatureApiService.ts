// src/app/features/integrations/services/cloudinarySignatureApiService.ts

import { axiosInstance } from "src/lib/axios/axiosInstance";


export type CloudinarySignatureResponse = {
  timestamp: number;
  signature: string;
  folder?: string;
};

export const cloudinarySignatureApiService = {
  getRestaurantGallerySignature: async (): Promise<CloudinarySignatureResponse> => {
    const response = await axiosInstance.get('/generate-signature/restaurantes');
    return response.data;
  },

  getRestaurantProfileSignature: async (): Promise<CloudinarySignatureResponse> => {
    const response = await axiosInstance.get('/generate-signature/perfil-restaurantes');
    return response.data;
  },

  getUserProfileSignature: async (): Promise<CloudinarySignatureResponse> => {
    const response = await axiosInstance.get('/generate-signature/perfil-usuarios');
    return response.data;
  },
};
