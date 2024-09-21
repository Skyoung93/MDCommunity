import { Post } from 'types/post';
import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';

type UpdatePostAPIProps = {
  updatedPost: Post;
};

export const UpdatePostAPI = async ({
  updatedPost,
}: UpdatePostAPIProps): Promise<StatusCode> => {
  try {
    const url = `${baseURL}/posts/${updatedPost.id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(updatedPost),
    });
    if (response.ok === true) {
      return StatusCode.SUCCESS;
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ GetPost', e);
    // Perhaps add a logger library, but depends on the team I suppose
    return StatusCode.FAIL;
  }
};
