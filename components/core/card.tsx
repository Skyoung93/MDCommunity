import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  base: {
    borderRadius: 30,
    overflow: 'hidden',
    minHeight: 100,
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
});

const colorStyles = StyleSheet.create({
  default: {
    backgroundColor: 'transparent',
  },
  white: {
    backgroundColor: '#FFFFFF',
  },
});

type CardProps = {
  children: React.ReactNode;
  color?: 'default' | 'white';
  style?: ViewStyle;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({
  children,
  color = 'default',
  style,
  onClick,
}) => {
  const colorClass = colorStyles[color];
  const shadowClass = styles.shadow;
  if (onClick !== undefined) {
    return (
      <TouchableOpacity
        style={[styles.base, shadowClass, colorClass, style]}
        onPress={onClick}
      >
        {children}
      </TouchableOpacity>
    );
  } else {
    return <View style={[styles.base, style]}>{children}</View>;
  }
};
