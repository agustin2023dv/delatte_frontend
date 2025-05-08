/**
 * 🏷️ Componente `RestaurantHeaderInfo`
 *
 * Muestra la información principal de un restaurante:
 * - Nombre y descripción
 * - Dirección
 * - Contacto (email y teléfono)
 * - Estado operativo (abierto/cerrado)
 * - Calificación y cantidad de reseñas
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IRestaurant } from '@delatte/shared/interfaces';
import DelatteBadge from '@shared/components/ui/DelatteBadge';

interface Props {
  restaurant: IRestaurant;
}

const RestaurantHeaderInfo = ({ restaurant }: Props) => {
  const { identity, location, contact, operationalData } = restaurant;
  const { status, stats } = operationalData;

  return (
    <View style={styles.container}>
      {/* 🏷️ Nombre y descripción */}
      <Text style={styles.title}>{identity.nombre}</Text>
      {identity.descripcion && <Text style={styles.description}>{identity.descripcion}</Text>}

      {/* 📍 Dirección */}
      <Text style={styles.subtitle}>
        {location.direccion}, {location.localidad}, {location.pais}
      </Text>

      {/* ☎️ Contacto */}
      {contact?.emailContacto && <Text style={styles.contact}>📧 {contact.emailContacto}</Text>}
      {contact?.telefono && <Text style={styles.contact}>📞 {contact.telefono}</Text>}

      {/* 🟢 Estado operativo y ⭐️ Calificación */}
      <View style={styles.badges}>
        <DelatteBadge
          text={status.estaAbierto ? 'Abierto' : 'Cerrado'}
          color={status.estaAbierto ? 'green' : 'red'}
        />
        <DelatteBadge
          text={`${stats.reviews.calificacion.toFixed(1)} ⭐️ (${stats.reviews.totalReviews})`}
          color="blue"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
  contact: {
    fontSize: 13,
    color: '#666',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default RestaurantHeaderInfo;
