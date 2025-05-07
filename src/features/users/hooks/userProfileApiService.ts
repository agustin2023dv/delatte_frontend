// src/app/features/users/services/userProfileApiService.ts


import {
  IUserProfileResponseDTO,
  IUpdateUserProfileDTO,
} from '@delatte/shared/dtos';
import { axiosInstance } from 'src/lib/axios/axiosInstance';

export const getUserProfile = async (): Promise<IUserProfileResponseDTO> => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

export const updateUserProfile = async (
  data: IUpdateUserProfileDTO
): Promise<IUserProfileResponseDTO> => {
  const response = await axiosInstance.put('/profile', data);
  return response.data.user;
};
