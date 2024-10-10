import { Badge } from 'components/core/badge';
import { CloseButton } from 'components/core/closeButton';
import { Typography } from 'components/core/typography';
import { View } from 'react-native';
import { useJourneyContext } from 'state/journeyContext';
import { Journey } from 'types/journey';

type InProgressCardHeaderProps = {
  journey: Journey;
};

export const InProgressCardHeader = ({
  journey,
}: InProgressCardHeaderProps) => {
  const { toggleCompleteStatus } = useJourneyContext();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          padding: 20,
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Badge color="green">Active Journey</Badge>
          <CloseButton onClick={() => toggleCompleteStatus(journey.id)} />
        </View>
        <Typography
          size="title"
          textColor="dark"
          style={{ paddingLeft: 10 }}
        >
          {journey.title}
        </Typography>
        <Typography
          size="medium"
          style={{ paddingLeft: 10 }}
        >
          {journey.description}
        </Typography>
      </View>
    </View>
  );
};
