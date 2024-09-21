import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  base: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Android specific shadow
    minHeight: 100,
    padding: 10,
    justifyContent: 'center',
  },
});

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({ children, style, onClick }) => {
  if (onClick !== undefined) {
    return (
      <TouchableOpacity
        style={[styles.base, style]}
        onPress={onClick}
      >
        {children}
      </TouchableOpacity>
    );
  } else {
    return <View style={[styles.base, style]}>{children}</View>;
  }
};
