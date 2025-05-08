/**
 * ➕ Componente `CreateMenuModal`
 *
 * Modal para crear un nuevo menú con al menos un ítem obligatorio.
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ICreateMenuDTO } from '@delatte/shared/dtos';

interface Props {
  visible: boolean;
  restauranteId: string;
  onCreate: (data: ICreateMenuDTO) => void;
  onClose: () => void;
}

const CreateMenuModal = ({ visible, restauranteId, onCreate, onClose }: Props) => {
  const [tipo, setTipo] = useState<'Comida' | 'Bebidas' | 'Postres'>('Comida');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = () => {
    if (!nombre || !descripcion || !precio) return;

    const parsedPrecio = parseFloat(precio);
    if (isNaN(parsedPrecio) || parsedPrecio <= 0) return;

    const dto: ICreateMenuDTO = {
      restauranteId,
      tipo,
      items: [
        {
          nombre,
          descripcion,
          precio: parsedPrecio,
        },
      ],
    };

    onCreate(dto);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setTipo('Comida');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Crear nuevo menú</Text>

          <Text style={styles.label}>Tipo de menú</Text>
          <View style={styles.tipoSelector}>
            {(['Comida', 'Bebidas', 'Postres'] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.tipoButton, tipo === t && styles.tipoButtonSelected]}
                onPress={() => setTipo(t)}
              >
                <Text style={[styles.tipoText, tipo === t && styles.tipoTextSelected]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Primer ítem del menú</Text>
          <TextInput
            placeholder="Nombre del ítem"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Descripción"
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            placeholder="Precio"
            style={styles.input}
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          <View style={styles.actions}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Crear menú" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '500',
  },
  tipoSelector: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 6,
  },
  tipoButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  tipoButtonSelected: {
    backgroundColor: '#007bff',
  },
  tipoText: {
    color: '#333',
  },
  tipoTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default CreateMenuModal;
