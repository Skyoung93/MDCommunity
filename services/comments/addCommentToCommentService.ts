import { UpdatePostAPI } from 'api/posts/updatePostAPI';
import { Comment, CommentConstructor } from 'types/comment';
import { Post } from 'types/post';
import StatusCode from 'types/statusCodes';

type AddCommentToCommentServiceProps = {
  index: number;
  commentID: number;
  posts: Post[];
  message: string;
  display_name: string;
};

export const AddCommentToCommentService = async ({
  index,
  commentID,
  posts,
  message,
  display_name,
}: AddCommentToCommentServiceProps): Promise<Post | StatusCode.FAIL> => {
  const post = posts[index];
  const comments = post.comments;

  const constructedComment: Comment = CommentConstructor({
    id: Object.keys(comments).length + 1,
    text: message,
    parent_id: commentID,
    display_name,
    userHugged: true,
  });

  const { children, ...newComment } = constructedComment;

  const updatedPost: Post = {
    ...post,
    comments: {
      ...comments,
      [newComment.id]: newComment,
    },
  };

  const response = await UpdatePostAPI({ updatedPost });

  if (response !== StatusCode.FAIL) {
    return updatedPost;
  }

  return response;
};
