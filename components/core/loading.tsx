import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefault: {
    fontSize: 18,
    color: '#1f2937',
  },
  textSmall: {
    fontSize: 14,
    color: '#1f2937',
  },
  textMedium: {
    fontSize: 16,
    color: '#1f2937',
  },
  textLarge: {
    fontSize: 20,
    color: '#1f2937',
  },
  spinner: {
    marginTop: 8,
  },
});

const sizeClasses = StyleSheet.create({
  default: {
    transform: [{ scale: 1.0 }],
    paddingTop: 5,
  },
  small: {
    transform: [{ scale: 1.5 }],
  },
  medium: {
    transform: [{ scale: 1.5 }],
    paddingTop: 5,
  },
  large: {
    transform: [{ scale: 2.0 }],
    paddingTop: 5,
  },
});

const textClasses = {
  default: styles.textDefault,
  small: styles.textSmall,
  medium: styles.textMedium,
  large: styles.textLarge,
};

type LoadingComponentProps = {
  header?: string;
  style?: TextStyle;
  variant?: 'default' | 'small' | 'medium' | 'large';
};

const LoadingComponent = ({
  header = 'Loading...',
  style,
  variant = 'default',
}: LoadingComponentProps): React.ReactNode => {
  const size = sizeClasses[variant];
  const textStyle = textClasses[variant];

  return (
    <View style={styles.container}>
      {variant !== 'small' && <Text style={[textStyle, style]}>{header}</Text>}
      <ActivityIndicator
        color="#000000"
        style={[styles.spinner, size]}
      />
    </View>
  );
};

export default LoadingComponent;
