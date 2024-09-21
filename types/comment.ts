import { Post } from './post';

export type CommentDict = {
  [commentID: string]: Comment;
};

export type Comment = {
  id: number;
  parent_id: number;
  display_name: string;
  text: string;
  created_at: string;
  num_hugs: number;
  userHugged: boolean;
  children: Comment[];
};

export type FocusedEntryType = {
  index: number;
  post?: Post;
  comment?: Comment;
};

export const CommentConstructor = ({
  id,
  parent_id,
  display_name,
  text,
  created_at = new Date().toISOString(),
  num_hugs = 1,
  userHugged = false,
  children = [],
}: {
  id: number;
  parent_id: number;
  display_name: string;
  text: string;
  created_at?: string;
  num_hugs?: number;
  userHugged?: boolean;
  children?: Comment[];
}) => {
  return {
    id,
    parent_id,
    display_name,
    text,
    created_at,
    num_hugs,
    userHugged,
    children,
  };
};

// Transformer function to create nested and sorted comments
export const CommentsConstructor = (commentsDict: {
  [key: string]: any;
}): Comment[] => {
  // Step 1: Convert dictionary to a flat array of Comment objects
  const flatComments: Comment[] = Object.values(commentsDict).map(
    (comment) => ({
      ...comment,
      children: [],
    })
  );

  // Step 2: Build a map for easier access and group comments by parent_id
  const commentMap: { [id: number]: Comment } = {};
  const rootComments: Comment[] = [];

  flatComments.forEach((comment) => {
    commentMap[comment.id] = comment;

    if (comment.parent_id === null) {
      rootComments.push(comment); // Top-level comment (no parent)
    } else if (commentMap[comment.parent_id]) {
      commentMap[comment.parent_id].children.push(comment); // Add to parent's children
    }
  });

  // Step 3: Sort children by created_at for each comment recursively
  const sortCommentsByDate = (comments: Comment[]) => {
    comments.forEach((comment) => {
      if (comment.children.length > 0) {
        sortCommentsByDate(comment.children); // Recursively sort children
      }
      comment.children.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  };

  // Sort root-level comments and their children
  sortCommentsByDate(rootComments);

  return rootComments;
};

// I would include a constructor here if the data was more complicated and needed type casting & sanitization
// But for the example the data structure is pretty straightforward
