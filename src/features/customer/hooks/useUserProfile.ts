import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userProfileApiService';
import {
  IUserProfileResponseDTO,
  IUpdateUserProfileDTO,
} from '@delatte/shared/dtos';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<IUserProfileResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener el perfil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: IUpdateUserProfileDTO) => {
    try {
      const updated = await updateUserProfile(data);
      setProfile(updated); // actualizamos el estado local
      return updated;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar el perfil');
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
};
