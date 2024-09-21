import { GetPostsAPI } from 'api/getPostsAPI';
import { Post, PostMetaData } from 'types/post';
import StatusCode from 'types/statusCodes';

type GetPostsServiceProps = {
  page: number;
};

export const GetPostsService = async ({
  page,
}: GetPostsServiceProps): Promise<
  | {
      metadata: PostMetaData;
      posts: Post[];
    }
  | StatusCode.FAIL
> => {
  const response = await GetPostsAPI({ page });
  // If using redux, this is where I would call the reducers to update the state
  return response;
};
