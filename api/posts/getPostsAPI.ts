import { PostMetaData, Post } from 'types/post';
import { baseURL } from 'env';
import StatusCode from 'types/statusCodes';
import { delay } from 'utils/delay';

type GetPostAPIProps = {
  page: number;
};

export const GetPostsAPI = async ({
  page,
}: GetPostAPIProps): Promise<
  | {
      metadata: PostMetaData;
      posts: Post[];
    }
  | StatusCode.FAIL
> => {
  try {
    const url = `${baseURL}/posts?_page=${page}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    if (response.ok === true) {
      const postResponse = await response.json();
      const { first, prev, next, last, pages, items, data } = postResponse;
      const postMetaData: PostMetaData = {
        first,
        prev,
        next,
        last,
        pages,
        items,
      };

      await delay(1500); // Remove?

      return {
        metadata: postMetaData,
        posts: data,
      };
    } else {
      return StatusCode.FAIL;
    }
  } catch (e) {
    console.log('Error @ GetPost', e);
    // Perhaps add a logger library, but depends on the team I suppose
    return StatusCode.FAIL;
    // Perhaps look into error codes for future extendability
  }
};
