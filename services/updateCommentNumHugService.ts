import { UpdatePostAPI } from 'api/updatePostAPI';
import { Post } from 'types/post';
import StatusCode from 'types/statusCodes';

type UpdateCommentNumHugServiceProps = {
  posts: Post[];
  index: number;
  commentID: number;
  userHugged: boolean;
};

export const UpdateCommentNumHugService = async ({
  posts,
  index,
  commentID,
  userHugged,
}: UpdateCommentNumHugServiceProps): Promise<Post | StatusCode.FAIL> => {
  const selectedPost = posts[index];
  const selectedComment = selectedPost.comments[commentID];
  const { num_hugs } = selectedComment;
  const hugCount = userHugged ? num_hugs + 1 : num_hugs - 1;

  const updatedPost: Post = {
    ...selectedPost,
    comments: {
      ...selectedPost.comments,
      [commentID]: {
        ...selectedComment,
        num_hugs: hugCount,
        userHugged, // Toggle the userHugged state
      },
    },
  };

  const response = await UpdatePostAPI({ updatedPost });
  // If using redux, this is where I would call the reducers to update the state
  if (response === StatusCode.SUCCESS) {
    return updatedPost;
  }
};
