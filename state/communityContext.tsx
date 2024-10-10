import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AddCommentToCommentService } from 'services/comments/addCommentToCommentService';
import { AddCommentToPostService } from 'services/comments/addCommentToPostService';
import { UpdateCommentNumHugService } from 'services/posts/updateCommentNumHugService';
import { UpdatePostNumHugService } from 'services/posts/updatePostNumHugService';
import { Post, PostMetaData } from 'types/post';
import StatusCode from 'types/statusCodes';

type CommunityDataContextType = {
  metaData: PostMetaData;
  setMetaData: (updatedMetaData: PostMetaData) => void;
  posts: Post[];
  addToPosts: (newPosts: Post[], callbackFn?: Function) => void;
  selectedPostIndex: number;
  setSelectedPostIndex: (index: number) => void;
  selectedPost: Post | undefined;
  updatePostNumHugFn: (
    index: number,
    userHugged: boolean
  ) => Promise<Post | StatusCode.FAIL>;
  updateCommentNumHugFn: (
    index: number,
    commentID: number,
    userHugged: boolean
  ) => Promise<Post | StatusCode.FAIL>;
  addCommentToCommentFn: (
    index: number,
    commentID: number,
    message: string,
    display_name: string
  ) => Promise<Post | StatusCode.FAIL>;
  addCommentToPostFn: (
    index: number,
    message: string,
    display_name: string
  ) => Promise<Post | StatusCode.FAIL>;
};

const CommunityDataContext = createContext<CommunityDataContextType>({
  metaData: {
    first: null,
    prev: null,
    next: null,
    last: null,
    pages: null,
    items: null,
  },
  setMetaData: (updatedMetaData: PostMetaData) => undefined,
  posts: [],
  addToPosts: (newPosts: Post[], callbackFn?: Function) => undefined,
  selectedPostIndex: 0,
  setSelectedPostIndex: (index: number) => undefined,
  selectedPost: undefined,
  updatePostNumHugFn: (index: number, userHugged: boolean) => undefined,
  updateCommentNumHugFn: (
    index: number,
    commentID: number,
    userHugged: boolean
  ) => undefined,
  addCommentToCommentFn: (
    index: number,
    commentID: number,
    message: string,
    display_name: string
  ) => undefined,
  addCommentToPostFn: (index: number, message: string, display_name: string) =>
    undefined,
});

export const CommunityDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [metaData, setMetaData] = useState<PostMetaData>({
    first: null,
    prev: null,
    next: null,
    last: null,
    pages: null,
    items: null,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const addToPosts = (newPosts: Post[], callbackFn?: Function) => {
    setPosts((prev) => {
      const output = [...prev, ...newPosts];
      callbackFn !== undefined ? callbackFn() : null;
      return output;
    });
  };
  const updatePostInState = (index: number, updatedPost: Post) => {
    setPosts((prev) => {
      const updatedPosts = [...prev];
      updatedPosts[index] = updatedPost;
      return updatedPosts;
    });
  };

  const [selectedPostIndex, setSelectedPostIndex] = useState<
    number | undefined
  >(undefined);
  const selectedPost = posts[selectedPostIndex];

  const updatePostNumHugFn = useCallback(
    async (index: number, userHugged: boolean) => {
      const response = await UpdatePostNumHugService({
        posts,
        index,
        userHugged,
      });
      if (response !== StatusCode.FAIL) {
        updatePostInState(index, response);
      }
      return response;
    },
    [posts]
  );

  const updateCommentNumHugFn = useCallback(
    async (index: number, commentID: number, userHugged: boolean) => {
      const response = await UpdateCommentNumHugService({
        posts,
        index,
        commentID,
        userHugged,
      });
      if (response !== StatusCode.FAIL) {
        updatePostInState(index, response);
      }
      return response;
    },
    [posts]
  );

  const addCommentToCommentFn = useCallback(
    async (
      index: number,
      commentID: number,
      message: string,
      display_name: string
    ) => {
      const response = await AddCommentToCommentService({
        index,
        commentID,
        posts,
        message,
        display_name,
      });
      if (response !== StatusCode.FAIL) {
        updatePostInState(index, response);
      }
      return response;
    },
    [posts]
  );

  const addCommentToPostFn = useCallback(
    async (index: number, message: string, display_name: string) => {
      const response = await AddCommentToPostService({
        index,
        message,
        display_name,
        posts,
      });
      if (response !== StatusCode.FAIL) {
        updatePostInState(index, response);
      }
      return response;
    },
    [posts]
  );

  const value: CommunityDataContextType = useMemo(
    () => ({
      metaData,
      setMetaData,

      posts,
      addToPosts,

      selectedPostIndex,
      setSelectedPostIndex,
      selectedPost,

      updatePostNumHugFn,
      updateCommentNumHugFn,

      addCommentToCommentFn,
      addCommentToPostFn,
    }),
    [
      metaData,
      setMetaData,
      posts,
      addToPosts,
      selectedPostIndex,
      setSelectedPostIndex,
      selectedPost,

      updatePostNumHugFn,
      updateCommentNumHugFn,

      addCommentToCommentFn,
      addCommentToPostFn,
    ]
  );

  return (
    <CommunityDataContext.Provider value={value}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export function useCommunityContext(): CommunityDataContextType {
  return useContext(CommunityDataContext);
}
