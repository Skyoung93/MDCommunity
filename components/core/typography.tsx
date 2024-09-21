import { StyleSheet, Text, TextStyle } from 'react-native';

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  default: {
    fontSize: 18,
  },
  medium: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
});

const variantClasses = {
  title: variantStyles.title,
  default: variantStyles.default,
  medium: variantStyles.medium,
  small: variantStyles.small,
};

type TypographyProps = {
  children: string | string[];
  variant?: 'title' | 'default' | 'small' | 'medium';
  style?: TextStyle;
  numberOfLines?: number;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'default',
  style,
  numberOfLines,
}) => {
  const selectedVariantStyle = variantClasses[variant] || variantStyles.default;

  return (
    <Text
      style={[selectedVariantStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
