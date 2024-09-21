import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';

export type InputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  size?: 'default' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'warning' | 'success';
  style?: ViewStyle; // Custom container style
  inputStyle?: TextStyle; // Custom input text style
  multiline?: boolean;
};

const inputVariantStyles = StyleSheet.create({
  default: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  error: {
    borderColor: '#d92727',
    backgroundColor: '#ffe5e5',
  },
  warning: {
    borderColor: '#e0e32d',
    backgroundColor: '#fffbe5',
  },
  success: {
    borderColor: '#27e65a',
    backgroundColor: '#e5ffe5',
  },
});

const inputVariant = {
  default: inputVariantStyles.default,
  error: inputVariantStyles.error,
  warning: inputVariantStyles.warning,
  success: inputVariantStyles.success,
};

const Input = ({
  value,
  onChange,
  placeholder = '',
  variant = 'default',
  style,
  inputStyle,
  multiline,
}: InputProps) => {
  const selectedInputVariant = inputVariant[variant] || inputVariant.default;

  return (
    <View style={style}>
      <TextInput
        style={[styles.input, selectedInputVariant, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        scrollEnabled={multiline}
        numberOfLines={multiline ? undefined : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default Input;
