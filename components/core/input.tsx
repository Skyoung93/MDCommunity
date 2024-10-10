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
  color?: 'default' | 'light' | 'dark' | 'lighter' | 'darker';
  style?: ViewStyle; // Custom container style
  inputStyle?: TextStyle; // Custom input text style
  multiline?: boolean;
  useFlex?: boolean;
};

const sizeStyles = StyleSheet.create({
  large: {
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
    fontWeight: 500,
  },
  small: {
    fontSize: 12,
    fontWeight: 600,
  },
});
const sizeMapping = {
  default: sizeStyles.medium,
  small: sizeStyles.small,
  medium: sizeStyles.medium,
  large: sizeStyles.large,
};
const colorStyles = StyleSheet.create({
  borderless: {
    borderColor: 'transparent',
  },
  lighter: {
    color: '#F5F6FA',
    borderColor: '#F5F6FA',
  },
  light: {
    color: '#A8A8A8',
    borderColor: '#A8A8A8',
  },
  dark: {
    color: '#6F6F6F',
    borderColor: '#6F6F6F',
  },
  darker: {
    color: '#000000',
    borderColor: '#000000',
  },
});
const colorMapping = {
  light: colorStyles.light,
  lighter: colorStyles.lighter,
  dark: colorStyles.dark,
  default: colorStyles.borderless,
};

const Input = ({
  value,
  onChange,
  placeholder = '',
  color = 'default',
  size = 'default',
  style,
  inputStyle,
  multiline,
  useFlex = false,
}: InputProps) => {
  const sizeClass = sizeMapping[size];
  const colorClass = colorMapping[color];
  const flexClass = useFlex ? { flexGrow: 1, flex: 1 } : {};

  return (
    <View style={[{ minHeight: 32, minWidth: 100 }, flexClass, style]}>
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingBottom: 5,
          },
          sizeClass,
          colorClass,
          inputStyle,
        ]}
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

export default Input;
