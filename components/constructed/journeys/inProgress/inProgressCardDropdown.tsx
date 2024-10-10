import { Typography } from 'components/core/typography';
import {
  StepType,
  VerticalProgressBar,
} from 'components/core/verticalProgressBar';
import { View } from 'react-native';
import { useJourneyContext } from 'state/journeyContext';
import { Journey } from 'types/journey';

type InProgressCardDropdownProps = {
  journey: Journey;
};

export const InProgressCardDropdown = ({
  journey,
}: InProgressCardDropdownProps): React.ReactNode => {
  const { plan, track, reassess, id } = journey;
  const { togglePlanStatus, toggleTrackStatus, toggleReassessStatus } =
    useJourneyContext();
  const steps: StepType[] = [
    {
      label: 'Assessment & Plan',
      completed: plan,
      onClick: () => togglePlanStatus(id),
    },
    {
      label: 'Track Progress',
      completed: track,
      onClick: () => toggleTrackStatus(id),
    },
    {
      label: 'Assess Again',
      completed: reassess,
      onClick: () => toggleReassessStatus(id),
    },
  ];
  const colors = ['#FFBFD3', '#D3A9E2', '#B7A6FE'];

  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'relative',
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: 74,
          alignItems: 'flex-end',
          zIndex: 1,

          paddingTop: 20,
          paddingRight: 12,
        }}
      >
        <VerticalProgressBar
          steps={steps}
          colors={colors}
        />
      </View>
      <View style={{ gap: 2, width: '100%' }}>
        <View
          style={{
            height: 123,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 74,

            backgroundColor: plan ? '#FFF2F6' : '#FFFFFF',

            paddingTop: 24,
            gap: 8,
          }}
        >
          <Typography size="title">Assessment & Plan</Typography>
          <Typography size="medium">
            Hooray! You've completed your first step to better health!
          </Typography>
        </View>
        <View
          style={{
            height: 123,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 74,

            backgroundColor: track ? '#fbd6ff' : '#FFFFFF',

            paddingTop: 24,
            gap: 8,
          }}
        >
          <Typography size="title">Track Progress</Typography>
          <Typography size="medium">
            Track at least once every 3 days so we can provide better insights!
          </Typography>
        </View>
        <View
          style={{
            height: 145,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 74,

            backgroundColor: reassess ? '#e1d6ff' : '#FFFFFF',

            paddingTop: 24,
            gap: 8,
          }}
        >
          <Typography size="title">Assess Again</Typography>
          <Typography size="medium">OR</Typography>
          <Typography size="title">Explain Medical Results</Typography>
        </View>
      </View>
    </View>
  );
};
