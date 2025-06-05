import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuthContext } from 'src/core/context/AuthContext';
import { IPromotionResponseDTO } from '@delatte/shared/dtos';
import {
  getPromotionsByRestaurant,
  deletePromotion,
} from '@features/promotion/services/promotionBaseApiService';
import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';
import PromotionCard from '@features/promotion/components/PromotionCard';
import PromotionCreateModal from '@features/promotion/components/PromotionCreateModal';
import PromotionEditModal from '@features/promotion/components/PromotionEditModal';

const ManagerPromotionsScreen = () => {
  const { user } = useAuthContext();

  const {
    restaurants,
    loading: loadingRestaurants,
    error: errorRestaurants,
  } = useGetRestaurantsByManager(user?._id ?? '');

  const [promotions, setPromotions] = useState<IPromotionResponseDTO[]>([]);
  const [loadingPromos, setLoadingPromos] = useState(true);
  const [errorPromos, setErrorPromos] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<IPromotionResponseDTO | null>(null);

  useEffect(() => {
    const fetchAllPromotions = async () => {
      if (!restaurants.length) return;

      setLoadingPromos(true);
      try {
        const all = await Promise.all(
          restaurants.map((r) =>
            getPromotionsByRestaurant(r._id.toString())
          )
        );
        const flat = all.flat();
        setPromotions(flat);
      } catch (err: any) {
        setErrorPromos(
          err?.response?.data?.message || 'Error al obtener promociones'
        );
      } finally {
        setLoadingPromos(false);
      }
    };

    fetchAllPromotions();
  }, [restaurants]);

  const handleDelete = (restaurantId: string, promotionId: string) => {
    Alert.alert(
      '¿Eliminar promoción?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePromotion(restaurantId, promotionId);
              setPromotions((prev) =>
                prev.filter((p) => p._id !== promotionId)
              );
            } catch (err: any) {
              Alert.alert(
                'Error',
                err?.response?.data?.message || 'No se pudo eliminar'
              );
            }
          },
        },
      ]
    );
  };

  if (loadingRestaurants || loadingPromos) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorRestaurants || errorPromos) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorRestaurants || errorPromos}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Promociones de mis restaurantes</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Crear promoción</Text>
      </TouchableOpacity>

      <FlatList
        data={promotions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <PromotionCard promotion={item} />
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setSelectedPromotion(item)}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleDelete(
                    item.restaurante?._id?.toString() || '',
                    item._id
                  )
                }
              >
                <Text style={[styles.actionText, { color: 'red' }]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No hay promociones aún.</Text>}
      />

      {restaurants.length > 0 && (
        <PromotionCreateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          restaurantId={restaurants[0]._id.toString()}
          onSuccess={async () => {
            setModalVisible(false);
            setLoadingPromos(true);
            const all = await Promise.all(
              restaurants.map((r) =>
                getPromotionsByRestaurant(r._id.toString())
              )
            );
            setPromotions(all.flat());
            setLoadingPromos(false);
          }}
        />
      )}

      {selectedPromotion && (
        <PromotionEditModal
          visible={true}
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
          onSuccess={(updated) => {
            setPromotions((prev) =>
              prev.map((p) => (p._id === updated._id ? updated : p))
            );
            setSelectedPromotion(null);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  errorText: { color: 'red' },
});

export default ManagerPromotionsScreen;
