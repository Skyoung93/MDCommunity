import { Badge } from 'components/core/badge';
import { Typography } from 'components/core/typography';
import { format } from 'date-fns';
import { Text, TouchableOpacity, View } from 'react-native';
import { useJourneyContext } from 'state/journeyContext';
import { Journey } from 'types/journey';

type CompletedJourneyEntryProps = {
  journey: Journey;
  end?: boolean;
};

export const CompletedJourneyEntry = ({
  journey,
  end = false,
}: CompletedJourneyEntryProps): React.ReactNode => {
  const { id, title, endDate } = journey;
  const { toggleCompleteStatus } = useJourneyContext();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 70,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',

        borderBottomLeftRadius: end ? 30 : 0,
        borderBottomRightRadius: end ? 30 : 0,
      }}
      onPress={() => toggleCompleteStatus(id)}
    >
      <Typography
        size="large"
        textColor="light"
        style={{
          paddingLeft: 10,
        }}
      >
        {title}
      </Typography>
      <Badge color="red">{format(endDate, 'MM/dd/yyyy')}</Badge>
    </TouchableOpacity>
  );
};
