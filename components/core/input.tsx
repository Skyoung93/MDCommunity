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
};

const inputSizeStyles = StyleSheet.create({
  default: {
    height: 50,
  },
  small: {
    height: 40,
  },
  medium: {
    height: 60,
  },
  large: {
    height: 70,
  },
});

const inputSize = {
  default: inputSizeStyles.default,
  small: inputSizeStyles.small,
  medium: inputSizeStyles.medium,
  large: inputSizeStyles.large,
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
  size = 'default',
  variant = 'default',
  style,
  inputStyle,
}: InputProps) => {
  const selectedInputSize = inputSize[size] || inputSize.default;
  const selectedInputVariant = inputVariant[variant] || inputVariant.default;

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={[
          styles.input,
          selectedInputSize,
          selectedInputVariant,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default Input;
