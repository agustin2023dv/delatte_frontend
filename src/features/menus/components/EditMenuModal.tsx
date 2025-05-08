import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

type TipoMenu = 'Comida' | 'Bebidas' | 'Postres';

interface Props {
  currentTipo: TipoMenu;
  visible: boolean;
  onClose: () => void;
  onSave: (newTipo: TipoMenu) => void;
}

const EditMenuModal = ({ currentTipo, visible, onClose, onSave }: Props) => {
  const [tipo, setTipo] = useState<TipoMenu>(currentTipo);

  const handleSave = () => {
    if (tipo !== currentTipo) onSave(tipo);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar tipo de menú</Text>

          {(['Comida', 'Bebidas', 'Postres'] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.option,
                tipo === t && styles.optionSelected,
              ]}
              onPress={() => setTipo(t)}
            >
              <Text
                style={[
                  styles.optionText,
                  tipo === t && styles.optionTextSelected,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.actions}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Guardar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default EditMenuModal;
