import { Typography } from 'components/core/typography';
import { Text, View } from 'react-native';

export const CompletedCardHeader = () => {
  return (
    <View
      style={{
        backgroundColor: '#859FFE',
        padding: 20,
        gap: 15,
      }}
    >
      <Typography
        size="title"
        textColor="lighter"
      >
        Completed Journeys
      </Typography>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          size="medium"
          textColor="lighter"
        >
          Click to Reactivate
        </Typography>
        <Typography
          size="medium"
          textColor="lighter"
        >
          COMPLETED
        </Typography>
      </View>
    </View>
  );
};
