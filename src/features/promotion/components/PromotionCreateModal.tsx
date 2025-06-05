import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { createPromotion } from '@features/promotion/services/promotionBaseApiService';

interface Props {
  visible: boolean;
  onClose: () => void;
  restaurantId: string;
  onSuccess: () => void;
}

const PromotionCreateModal: React.FC<Props> = ({
  visible,
  onClose,
  restaurantId,
  onSuccess,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [descuento, setDescuento] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);
      await createPromotion(restaurantId, {
        titulo,
        descripcion,
        fechaInicio,
        fechaFin,
        descuento: Number(descuento),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'No se pudo crear la promoción.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Crear nueva promoción</Text>

          <ScrollView style={{ width: '100%' }}>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              placeholder="Descripción"
              style={styles.input}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
            />
            <TextInput
              placeholder="Fecha inicio (YYYY-MM-DD)"
              style={styles.input}
              value={fechaInicio}
              onChangeText={setFechaInicio}
            />
            <TextInput
              placeholder="Fecha fin (YYYY-MM-DD)"
              style={styles.input}
              value={fechaFin}
              onChangeText={setFechaFin}
            />
            <TextInput
              placeholder="Descuento (%)"
              style={styles.input}
              value={descuento}
              onChangeText={setDescuento}
              keyboardType="numeric"
            />
          </ScrollView>

          <Pressable
            style={[styles.button, styles.buttonCreate]}
            onPress={handleCreate}
            disabled={loading}
          >
            <Text style={styles.textStyle}>
              {loading ? 'Creando...' : 'Crear promoción'}
            </Text>
          </Pressable>

          <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    elevation: 2,
    marginTop: 12,
  },
  buttonCreate: {
    backgroundColor: '#28a745',
  },
  buttonClose: {
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PromotionCreateModal;
