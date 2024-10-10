import { StyleSheet, Text, TextStyle } from 'react-native';

const sizeStyles = StyleSheet.create({
  pageTitle: {
    fontSize: 32,
    fontWeight: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
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
  pageTitle: sizeStyles.pageTitle,
  title: sizeStyles.title,
  default: sizeStyles.medium,
  large: sizeStyles.large,
  medium: sizeStyles.medium,
  small: sizeStyles.small,
};

const textColorStyles = {
  lighter: {
    color: '#F5F6FA',
  },
  light: {
    color: '#A8A8A8',
  },
  dark: {
    color: '#6F6F6F',
  },
  darker: {
    color: '#000000',
  },
};

const textColorMapping = {
  light: textColorStyles.light,
  lighter: textColorStyles.lighter,
  dark: textColorStyles.dark,
  default: textColorStyles.dark,
};

type TypographyProps = {
  children: string | string[];
  size?: 'default' | 'pageTitle' | 'title' | 'small' | 'medium' | 'large';
  textColor?: 'default' | 'light' | 'dark' | 'lighter' | 'darker';
  style?: TextStyle;
  numberOfLines?: number;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  size = 'default',
  textColor = 'default',
  style,
  numberOfLines,
}) => {
  const sizeClass = sizeMapping[size] || sizeStyles.medium;
  const colorClass = textColorMapping[textColor];

  return (
    <Text
      style={[sizeClass, colorClass, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
