import { Journey } from 'types/journey';
import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';
import { delay } from 'utils/delay';

export const GetJourneysAPI = async (): Promise<
  Journey[] | StatusCode.FAIL
> => {
  try {
    await delay(1500);
    const url = `${baseURL}/journey`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response.ok === true) {
      const jsonRes = await response.json();
      return jsonRes as Journey[];
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ GetJourneys', e);
    return StatusCode.FAIL;
  }
};
