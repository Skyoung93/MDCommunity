import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type BadgeProps = {
  size?: 'default' | 'small' | 'medium' | 'large' | 'navigation';
  color?: 'default' | 'red' | 'green';
  children?: React.ReactNode;
  style?: ViewStyle; // Custom container style
  textStyle?: TextStyle; // Custom text style
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const badgeSizeStyles = StyleSheet.create({
  default: {
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  navigation: {
    borderRadius: 15,
    padding: 20,

    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
  },
});
const badgeSize = {
  default: badgeSizeStyles.default,
  navigation: badgeSizeStyles.navigation,
};

const badgeColorStyles = StyleSheet.create({
  default: {
    backgroundColor: 'transparent',
  },
  red: {
    backgroundColor: '#FFF2F6',
  },
  green: {
    backgroundColor: '#E2F9FB',
  },
});
const badgeColor = {
  default: badgeColorStyles.default,
  red: badgeColorStyles.red,
  green: badgeColorStyles.green,
};
const textSizeStyles = StyleSheet.create({
  base: {
    fontWeight: 600,
  },
  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 16,
  },
  medium: {
    fontSize: 20,
  },
  large: {
    fontSize: 24,
  },
  navigation: {
    fontSize: 28,
  },
});
const textSize = {
  default: textSizeStyles.default,
  small: textSizeStyles.small,
  medium: textSizeStyles.medium,
  large: textSizeStyles.large,
  navigation: textSizeStyles.navigation,
};
const textColorStyles = StyleSheet.create({
  default: {
    color: '#000000',
  },
  red: {
    color: '#E76C9C',
  },
  green: {
    color: '#67a8af',
  },
});
const textColor = {
  default: textColorStyles.default,
  red: textColorStyles.red,
  green: textColorStyles.green,
};

export const Badge: React.FC<BadgeProps> = ({
  size = 'default',
  color = 'default',
  children,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const selectedBadgeSize = badgeSize[size] || badgeSizeStyles.default;
  const selectedBadgeColor = badgeColor[color] || badgeColor.default;

  const selectedTextSize = textSize[size] || textSize.default;
  const selectedTextColor = textColor[color] || textColor.default;

  return (
    <View style={[selectedBadgeSize, selectedBadgeColor, style]}>
      {leftIcon ? <View>{leftIcon}</View> : null}
      {children ? (
        <Text
          style={[
            textSizeStyles.base,
            selectedTextSize,
            selectedTextColor,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : null}
      {rightIcon ? <View>{rightIcon}</View> : null}
    </View>
  );
};
