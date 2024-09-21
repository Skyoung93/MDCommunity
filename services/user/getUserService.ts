import { GetUserDataAPI } from 'api/user/getUserDataAPI';
import StatusCode from 'types/statusCodes';
import { User } from 'types/user';

export const GetUserDataService = async (): Promise<User | StatusCode.FAIL> => {
  const response = await GetUserDataAPI();
  // If using redux, this is where I would call the reducers to update the state
  return response;
};
