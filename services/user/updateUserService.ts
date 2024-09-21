import { UpdateUserDataAPI } from 'api/user/updateUserDataAPI';
import StatusCode from 'types/statusCodes';
import { User } from 'types/user';

type UpdatePostNumHugServiceProps = {
  updatedUser: User;
};

export const UpdateUserDataService = async ({
  updatedUser,
}: UpdatePostNumHugServiceProps): Promise<StatusCode> => {
  const response = await UpdateUserDataAPI({ updatedUser });
  // If using redux, this is where I would call the reducers to update the state
  return response;
};
