import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import { Badge } from './badge';

type ButtonProps = {
  size?: 'default' | 'small' | 'medium' | 'large' | 'navigation';
  color?: 'default' | 'red' | 'green';
  children?: React.ReactNode;
  style?: ViewStyle; // Custom container style
  textStyle?: TextStyle; // Custom text style
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  onClick: () => void;
};

export const Button = ({ onClick, ...props }: ButtonProps): React.ReactNode => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Badge {...props} />
    </TouchableOpacity>
  );
};
