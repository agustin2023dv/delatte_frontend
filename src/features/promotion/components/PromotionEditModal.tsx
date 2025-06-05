// src/features/promotion/components/PromotionEditModal.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IPromotionResponseDTO, IUpdatePromotionDTO } from '@delatte/shared/dtos';
import { updatePromotion } from '../services/promotionBaseApiService';

interface Props {
  visible: boolean;
  onClose: () => void;
  promotion: IPromotionResponseDTO;
  onSuccess: (updated: IPromotionResponseDTO) => void;
}

const PromotionEditModal = ({ visible, onClose, promotion, onSuccess }: Props) => {
  const [form, setForm] = useState<IUpdatePromotionDTO>({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    descuento: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (promotion) {
      setForm({
        titulo: promotion.titulo || '',
        descripcion: promotion.descripcion || '',
        fechaInicio: promotion.fechaInicio?.slice(0, 10) || '',
        fechaFin: promotion.fechaFin?.slice(0, 10) || '',
        descuento: promotion.descuento ?? 0,
      });
    }
  }, [promotion]);

  const handleChange = (key: keyof IUpdatePromotionDTO, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updated = await updatePromotion(
        promotion.restaurante._id.toString(),
        promotion._id,
        form
      );
      onSuccess(updated);
    } catch (err: any) {
      console.error('Error actualizando promoción:', err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar promoción</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={form.titulo}
          onChangeText={(text) => handleChange('titulo', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={form.descripcion}
          onChangeText={(text) => handleChange('descripcion', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha inicio (YYYY-MM-DD)"
          value={form.fechaInicio}
          onChangeText={(text) => handleChange('fechaInicio', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha fin (YYYY-MM-DD)"
          value={form.fechaFin}
          onChangeText={(text) => handleChange('fechaFin', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descuento (%)"
          keyboardType="numeric"
          value={form.descuento?.toString()}
          onChangeText={(text) => handleChange('descuento', Number(text))}
        />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.save} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.saveText}>{loading ? 'Guardando...' : 'Guardar'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancel: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ccc',
    flex: 1,
    marginRight: 8,
  },
  save: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    flex: 1,
    marginLeft: 8,
  },
  cancelText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  saveText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PromotionEditModal;
