import { UpdatePostAPI } from 'api/posts/updatePostAPI';
import { Post } from 'types/post';
import StatusCode from 'types/statusCodes';

type UpdatePostNumHugServiceProps = {
  posts: Post[];
  index: number;
  userHugged: boolean;
};

export const UpdatePostNumHugService = async ({
  posts,
  index,
  userHugged,
}: UpdatePostNumHugServiceProps): Promise<Post | StatusCode.FAIL> => {
  const selectedPost = posts[index];
  const { num_hugs } = selectedPost;
  const hugCount = userHugged ? num_hugs + 1 : num_hugs - 1;

  const updatedPost: Post = { ...selectedPost, num_hugs: hugCount, userHugged };
  const response = await UpdatePostAPI({ updatedPost });
  // If using redux, this is where I would call the reducers to update the state
  if (response === StatusCode.SUCCESS) {
    return updatedPost;
  }
};
