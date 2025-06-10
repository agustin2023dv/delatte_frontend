export type DateTimeField = 'date' | 'time';

export interface DateTimePickerProps {
  mode: DateTimeField;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  label?: string;
}