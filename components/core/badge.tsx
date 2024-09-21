import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type BadgeProps = {
  size?: 'default' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'warning' | 'success' | 'active';
  children: React.ReactNode;
  style?: ViewStyle; // Custom container style
  textStyle?: TextStyle; // Custom text style
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const badgeSizeStyles = StyleSheet.create({
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
  },
  default: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#A0A0A0',
    borderWidth: 2,
    borderStyle: 'solid',
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
const badgeSize = {
  default: badgeSizeStyles.default,
  small: badgeSizeStyles.small,
  medium: badgeSizeStyles.medium,
  large: badgeSizeStyles.large,
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

const badgeVariantStyles = StyleSheet.create({
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
const badgeVariant = {
  default: badgeVariantStyles.default,
  error: badgeVariantStyles.error,
  warning: badgeVariantStyles.warning,
  success: badgeVariantStyles.success,
  active: badgeVariantStyles.active,
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

export const Badge: React.FC<BadgeProps> = ({
  size = 'default',
  variant = 'default',
  children,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const selectedbadgeSize = badgeSize[size] || badgeSize.default;
  const selectedTextSize = textSize[size] || textSize.default;
  const selectedbadgeVariant = badgeVariant[variant] || badgeVariant.default;
  const selectedTextVariant = textVariant[variant] || textVariant.default;

  return (
    <View
      style={[
        badgeSizeStyles.base,
        selectedbadgeSize,
        selectedbadgeVariant,
        style,
      ]}
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
    </View>
  );
};
