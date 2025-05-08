// EditMenuItemModal.tsx
import { IMenuItemWithId } from '@delatte/shared/interfaces/Menu/IMenuItemWithId';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

interface Props {
  item: IMenuItemWithId;
  visible: boolean;
  onSave: (updatedItem: IMenuItemWithId) => void;
  onClose: () => void;
}

const EditMenuItemModal = ({ item, visible, onSave, onClose }: Props) => {
  const [name, setName] = useState(item.nombre);
  const [description, setDescription] = useState(item.descripcion);
  const [price, setPrice] = useState(item.precio.toString());

  const handleSave = () => {
    onSave({
      ...item,
      nombre: name,
      descripcion: description,
      precio: parseFloat(price),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
          <View style={styles.actions}>
            <Button title="Guardar" onPress={handleSave} />
            <Button title="Cancelar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditMenuItemModal;