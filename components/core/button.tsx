import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';

type ButtonProps = {
  size?: 'default' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'warning' | 'success' | 'active';
  children: React.ReactNode;
  onClick: () => void;
  style?: ViewStyle; // Custom container style
  textStyle?: TextStyle; // Custom text style
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const buttonSizeStyles = StyleSheet.create({
  base: {
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Android specific shadow
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    borderColor: '#A0A0A0',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  default: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  medium: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  large: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
const buttonSize = {
  default: buttonSizeStyles.default,
  small: buttonSizeStyles.small,
  medium: buttonSizeStyles.medium,
  large: buttonSizeStyles.large,
};
const textSizeStyles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 18,
  },
  large: {
    fontSize: 20,
  },
});
const textSize = {
  default: textSizeStyles.default,
  small: textSizeStyles.small,
  medium: textSizeStyles.medium,
  large: textSizeStyles.large,
};

const buttonVariantStyles = StyleSheet.create({
  default: {
    backgroundColor: 'transparent',
  },
  error: {
    backgroundColor: '#d92727',
  },
  warning: {
    backgroundColor: '#e0e32d',
  },
  success: {
    backgroundColor: '#27e65a',
  },
  active: {
    backgroundColor: '#cf404a',
  },
});
const buttonVariant = {
  default: buttonVariantStyles.default,
  error: buttonVariantStyles.error,
  warning: buttonVariantStyles.warning,
  success: buttonVariantStyles.success,
  active: buttonVariantStyles.active,
};
const textVariantStyles = StyleSheet.create({
  base: {
    fontWeight: 'bold',
  },
  light: {
    color: '#edebeb',
  },
  dark: {
    color: '#2b2b2b',
  },
});
const textVariant = {
  default: textVariantStyles.dark,
  error: textVariantStyles.light,
  warning: textVariantStyles.dark,
  success: textVariantStyles.dark,
  active: textVariantStyles.light,
};

export const Button: React.FC<ButtonProps> = ({
  size = 'default',
  variant = 'default',
  children,
  onClick,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const selectedButtonSize = buttonSize[size] || buttonSize.default;
  const selectedTextSize = textSize[size] || textSize.default;
  const selectedButtonVariant = buttonVariant[variant] || buttonVariant.default;
  const selectedTextVariant = textVariant[variant] || textVariant.default;

  return (
    <TouchableOpacity
      style={[
        buttonSizeStyles.base,
        selectedButtonSize,
        selectedButtonVariant,
        style,
      ]}
      onPress={onClick}
    >
      {leftIcon ? <View>{leftIcon}</View> : null}

      <Text
        style={[
          textVariantStyles.base,
          selectedTextSize,
          selectedTextVariant,
          textStyle,
        ]}
      >
        {children}
      </Text>
      {rightIcon ? <View>{rightIcon}</View> : null}
    </TouchableOpacity>
  );
};
