import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IRestaurant } from '@delatte/shared/interfaces';
import { useRouter } from 'expo-router';
import DelatteBadge from '@ui/DelatteBadge';

type Props = {
  restaurant: IRestaurant;
};

/**
 * 🧩 Componente `RestaurantCard`
 *
 * Vista compacta para listar restaurantes:
 * - Logo pequeño (si hay)
 * - Nombre
 * - Dirección
 * - Estado abierto/cerrado
 * - Calificación + cantidad de reseñas
 */
const RestaurantCard = ({ restaurant }: Props) => {
  const router = useRouter();

  const {
    _id,
    identity,
    location,
    operationalData,
    media,
  } = restaurant;

  const { nombre } = identity;
  const { direccion, localidad, pais } = location;

  const estaAbierto = operationalData?.status?.estaAbierto ?? false;
  const calificacion = operationalData?.stats?.reviews?.calificacion ?? 0;
  const totalReviews = operationalData?.stats?.reviews?.totalReviews ?? 0;

  const logo = media?.logo;

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/restaurants/${_id}`)}>
      {logo ? (
        <Image source={{ uri: logo }} style={styles.logo} />
      ) : (
        <View style={styles.logoPlaceholder} />
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.subtitle}>{direccion}, {localidad}, {pais}</Text>

        <View style={styles.row}>
          <DelatteBadge
            text={estaAbierto ? 'Abierto' : 'Cerrado'}
            color={estaAbierto ? 'green' : 'red'}
          />
          <Text style={styles.rating}>
            ⭐ {calificacion.toFixed(1)} ({totalReviews})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    color: '#333',
  },
});

export default RestaurantCard;
