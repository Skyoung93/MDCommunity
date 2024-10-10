import { Text, View } from 'react-native';

export const ErrorPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        paddingBottom: 125,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Error! Something went wrong...
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Whoops 😬
      </Text>
    </View>
  );
};
