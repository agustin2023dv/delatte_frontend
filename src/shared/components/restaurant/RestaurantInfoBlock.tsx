import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IRestaurant } from '@delatte/shared/interfaces';
import DelatteBadge from '@shared/components/ui/DelatteBadge';

type Props = {
  restaurant: IRestaurant;
  viewerRole: 'customer' | 'manager';
};

/**
 * ℹ️ Componente `RestaurantInfoBlock`
 * 
 * Muestra información extendida del restaurante, adaptada según el rol del usuario:
 * - Customer: solo ve info pública y útil para su experiencia
 * - Manager: ve datos operativos y administrativos adicionales
 */
const RestaurantInfoBlock = ({ restaurant, viewerRole }: Props) => {
  const {
    identity,
    location,
    contact,
    operationalData,
    tradingHours,
    capacity,
    metadata,
    tags,
  } = restaurant;

  const { status, stats } = operationalData;
  const tagList = tags?.tags ?? [];

  return (
    <View style={styles.container}>
      {/* 🏷️ Nombre y descripción */}
      <Text style={styles.title}>{identity.nombre}</Text>
      {identity.descripcion && <Text style={styles.description}>{identity.descripcion}</Text>}

      {/* 📍 Dirección */}
      <Text style={styles.subtitle}>{location.direccion}, {location.localidad}, {location.pais}</Text>

      {/* ☎️ Contacto */}
      {contact?.emailContacto && <Text style={styles.contact}>📧 {contact.emailContacto}</Text>}
      {contact?.telefono && <Text style={styles.contact}>📞 {contact.telefono}</Text>}

      {/* 🟢 Estado y ⭐️ Calificación */}
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

      {/* 📅 Horarios de atención */}
      {tradingHours?.horarios?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios de atención</Text>
          {tradingHours.horarios.map((h, idx) => (
            <Text key={idx} style={styles.subItem}>
              {h.dia}: {h.horaApertura} - {h.horaCierre}
            </Text>
          ))}
        </View>
      )}

      {/* 🏷️ Tags */}
      {tagList.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Etiquetas</Text>
          <Text style={styles.subItem}>{tagList.join(', ')}</Text>
        </View>
      )}

      {/* 🪑 Capacidad (solo manager) */}
      {viewerRole === 'manager' && capacity?.capacidadMesas?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capacidad de mesas</Text>
          {capacity.capacidadMesas.map((m, idx) => (
            <Text key={idx} style={styles.subItem}>
              {m.cantidad} mesas de {m.personasPorMesa} personas
            </Text>
          ))}
        </View>
      )}

      {/* 🕓 Última actualización (solo manager) */}
      {viewerRole === 'manager' && metadata?.ultimaActualizacion && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Última actualización: {new Date(metadata.ultimaActualizacion).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 20,
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
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  subItem: {
    fontSize: 13,
    color: '#444',
  },
});

export default RestaurantInfoBlock;
