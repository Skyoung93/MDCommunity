import { Journey } from 'types/journey';
import { InProgressCardHeader } from './inProgressCardHeader';
import { Accordion } from 'components/core/accordion';
import { InProgressCardDropdown } from './inProgressCardDropdown';

type InProgressJourneyCardProps = {
  journey: Journey;
};

export const InProgressJourneyCard = ({
  journey,
}: InProgressJourneyCardProps): React.ReactNode => {
  return (
    <Accordion
      Header={<InProgressCardHeader journey={journey} />}
      Dropdown={<InProgressCardDropdown journey={journey} />}
    />
  );
};
