import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerProps } from './types';
import { StyleSheet } from 'react-native';

export const NativeDateTimePicker: React.FC<DateTimePickerProps> = ({
  mode,
  value,
  onChange,
  label = 'Selecciona una fecha u hora',
  minimumDate,
  maximumDate,
}) => {
  const [show, setShow] = useState(false);

  const showPicker = () => setShow(true);
  const hidePicker = () => setShow(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    hidePicker();
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={label} onPress={showPicker} />
      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});