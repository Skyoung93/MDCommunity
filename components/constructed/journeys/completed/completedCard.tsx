import { Text, View } from 'react-native';
import { Journey } from 'types/journey';
import { CompletedCardHeader } from './completedHeader';
import { CompletedJourneyEntry } from './completedJourneyEntry';
import { Card } from 'components/core/card';
import LoadingComponent from 'components/core/loading';

type CompletedCardProps = {
  completedList: Journey[];
  loading: boolean;
};

export const CompletedCard = ({
  completedList,
  loading,
}: CompletedCardProps) => {
  return (
    <Card
      style={{
        width: '100%',
      }}
    >
      <CompletedCardHeader />

      <View
        style={{
          gap: 2,
        }}
      >
        {completedList.length
          ? completedList.map((journey, index) => (
              <CompletedJourneyEntry
                key={journey.id}
                journey={journey}
                end={index === completedList.length - 1 ? true : false}
              />
            ))
          : null}
        {loading && (
          <Card
            style={{
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
              }}
            >
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  padding: 35,
                  gap: 8,
                }}
              >
                <LoadingComponent variant="large" />
              </View>
            </View>
          </Card>
        )}
      </View>
    </Card>
  );
};
