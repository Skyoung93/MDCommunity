import { Journey } from 'types/journey';
import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';

type UpdateJourneyAPIProps = {
  updatedJourney: Journey;
};

export const UpdateJourneyAPI = async ({
  updatedJourney,
}: UpdateJourneyAPIProps): Promise<StatusCode> => {
  try {
    const url = `${baseURL}/journey/${updatedJourney.id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJourney),
    });
    if (response.ok === true) {
      return StatusCode.SUCCESS;
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ UpdateJourney', e);
    return StatusCode.FAIL;
  }
};
