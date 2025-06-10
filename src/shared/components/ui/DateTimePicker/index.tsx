import React from 'react';
import { Platform } from 'react-native';
import { WebDateTimePicker } from './WebDateTimePicker';
import { NativeDateTimePicker } from './NativeDateTimePicker';
import { DateTimePickerProps } from './types';

const DateTimePickerComponent =
  Platform.OS === 'web' ? WebDateTimePicker : NativeDateTimePicker;

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  return <DateTimePickerComponent {...props} />;
};