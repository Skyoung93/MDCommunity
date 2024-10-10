import { useEffect, useState } from 'react';
import { JourneyDataProvider, useJourneyContext } from 'state/journeyContext';
import StatusCode from 'types/statusCodes';
import { ErrorPage } from './errorPage';
import { ScrollView, View } from 'react-native';
import { Journey, JourneyByID } from 'types/journey';
import { sortByEndDate } from 'utils/sortByEndDate';
import { CompletedCard } from 'components/constructed/journeys/completed/completedCard';
import { InProgressJourneyCard } from 'components/constructed/journeys/inProgress/inProgressJourneyCard';
import LoadingComponent from 'components/core/loading';
import { Card } from 'components/core/card';

export const JourneyPage = (): React.ReactNode => {
  return (
    <JourneyDataProvider>
      <JourneyPageContent />
    </JourneyDataProvider>
  );
};

const JourneyPageContent = (): React.ReactNode => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { journeyDict, fetchAllJourneys } = useJourneyContext();

  useEffect(() => {
    const InitialLoad = async () => {
      const response = await fetchAllJourneys();
      if (response !== StatusCode.SUCCESS) {
        setError(true);
      }
      setLoading(false);
    };
    InitialLoad().catch((e) => console.log('Error on initial load', e));
  }, []);

  const { completedList, incompletedList } =
    separateAndSortJourneys(journeyDict);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ScrollView
      style={{
        backgroundColor: '#F5F6FA',
      }}
    >
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

      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 10,
          gap: 25,
        }}
      >
        {incompletedList.map((journey) => (
          <InProgressJourneyCard
            key={journey.id}
            journey={journey}
          />
        ))}

        <CompletedCard
          completedList={completedList}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

const separateAndSortJourneys = (
  journeyDict: JourneyByID
): { completedList: Journey[]; incompletedList: Journey[] } => {
  const completedList: Journey[] = [];
  const incompletedList: Journey[] = [];

  Object.values(journeyDict).forEach((journey) => {
    if (journey.isComplete) {
      completedList.push(journey);
    } else {
      incompletedList.push(journey);
    }
  });

  // Sort both lists by endDate
  completedList.sort((a, b) => sortByEndDate(a.endDate, b.endDate, true));
  incompletedList.sort((a, b) => sortByEndDate(a.startDate, b.startDate));

  return { completedList, incompletedList };
};
