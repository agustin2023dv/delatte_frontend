// src/app/features/users/hooks/useUserAddresses.ts

import { useEffect, useState } from 'react';
import {
  getUserAddresses,
  addUserAddress,
  removeUserAddress,
} from './userAddressApiService';

export const useUserAddresses = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getUserAddresses();
      setAddresses(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener direcciones');
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address: string) => {
    try {
      const updated = await addUserAddress(address);
      setAddresses(updated);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al agregar dirección');
      throw err;
    }
  };

  const deleteAddress = async (address: string) => {
    try {
      const updated = await removeUserAddress(address);
      setAddresses(updated);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al eliminar dirección');
      throw err;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    refetch: fetchAddresses,
    addAddress,
    deleteAddress,
  };
};
