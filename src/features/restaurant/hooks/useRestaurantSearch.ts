import { useState, useCallback } from 'react';
import { searchRestaurantsByName } from '../services/restaurantSearchApiService';
import { IRestaurant } from '@delatte/shared/interfaces';
import debounce from 'lodash.debounce';

export const useRestaurantSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función debounced para realizar la búsqueda
  const debouncedSearch = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchRestaurantsByName(text);
        setResults(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Error al buscar restaurantes');
      } finally {
        setLoading(false);
      }
    }, 2000), // Retardo de 2 segundos
    []
  );

  // Función que maneja los cambios en el campo de búsqueda
  const handleSearch = (text: string): void => {
    const trimmedText = text.trim();
    setQuery(trimmedText);

    // Si el texto está vacío, limpiar resultados y errores
    if (!trimmedText) {
      setResults([]);
      setError(null);
      return;
    }

    // Llamar a la función debounced
    debouncedSearch(trimmedText);
  };

  return {
    query,
    results,
    loading,
    error,
    handleSearch,
  };
};