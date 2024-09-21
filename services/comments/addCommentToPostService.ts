import { UpdatePostAPI } from 'api/posts/updatePostAPI';
import { Comment, CommentConstructor } from 'types/comment';
import { Post } from 'types/post';
import StatusCode from 'types/statusCodes';

type AddCommentToPostServiceProps = {
  index: number;
  posts: Post[];
  message: string;
  display_name: string;
};

export const AddCommentToPostService = async ({
  index,
  posts,
  message,
  display_name,
}: AddCommentToPostServiceProps): Promise<Post | StatusCode.FAIL> => {
  const post = posts[index];
  const comments = post.comments;

  const constructedComment: Comment = CommentConstructor({
    id: Object.keys(comments).length + 1,
    text: message,
    parent_id: null,
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

  console.log(JSON.stringify(updatedPost, null, 2));

  const response = await UpdatePostAPI({ updatedPost });

  if (response !== StatusCode.FAIL) {
    return updatedPost;
  }

  return response;
};
