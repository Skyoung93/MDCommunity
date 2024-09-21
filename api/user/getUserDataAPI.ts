import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';
import { User } from 'types/user';

export const GetUserDataAPI = async (): Promise<User | StatusCode.FAIL> => {
  try {
    const url = `${baseURL}/user`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response.ok === true) {
      const postResponse = await response.json();

      return postResponse as User;
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ GetUser', e);
    // Perhaps add a logger library, but depends on the team I suppose
    return StatusCode.FAIL;
    // Perhaps look into error codes for future extendability
  }
};
