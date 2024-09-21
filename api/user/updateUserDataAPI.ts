import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';
import { User } from 'types/user';

type UpdateUserDataProps = {
  updatedUser: User;
};

export const UpdateUserDataAPI = async ({
  updatedUser,
}: UpdateUserDataProps): Promise<StatusCode> => {
  try {
    const url = `${baseURL}/user`;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
    });

    if (response.ok === true) {
      const postResponse = await response.json();

      return StatusCode.SUCCESS;
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ UpdateUser', e);
    // Perhaps add a logger library, but depends on the team I suppose
    return StatusCode.FAIL;
    // Perhaps look into error codes for future extendability
  }
};
