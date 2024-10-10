import { UpdateJourneyAPI } from 'api/journeys/updateJourneyAPI';
import { Journey } from 'types/journey';
import StatusCode from 'types/statusCodes';

type UpdateJourneyServiceProps = {
  updatedJourney: Journey;
};

export const UpdateJourneyService = async ({
  updatedJourney,
}: UpdateJourneyServiceProps): Promise<Journey | StatusCode.FAIL> => {
  const response = await UpdateJourneyAPI({ updatedJourney });
  if (response === StatusCode.SUCCESS) {
    return updatedJourney;
  } else {
    return StatusCode.FAIL;
  }
};
