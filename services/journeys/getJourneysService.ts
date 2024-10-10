import { GetJourneysAPI } from 'api/journeys/getJourneysAPI';
import { Journey } from 'types/journey';
import StatusCode from 'types/statusCodes';

export const GetJourneysSerivice = async (): Promise<
  Journey[] | StatusCode.FAIL
> => {
  const response = await GetJourneysAPI();
  if (response !== StatusCode.FAIL) {
    return response;
  } else {
    return response;
  }
};
