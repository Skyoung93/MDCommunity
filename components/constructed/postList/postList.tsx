import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Post } from 'types/post';
import { PostEntry } from './postEntry';

const postListStyles = StyleSheet.create({
  listContainer: {
    gap: 7,
  },
});

type PostListProps = {
  posts: Post[];
  handleSelectedPostClick: (index: number) => void;
  handleHugClick: (index: number, userHugged: boolean) => Promise<void>;
};

export const PostList = ({
  posts,
  handleSelectedPostClick,
  handleHugClick,
}: PostListProps): React.ReactNode => {
  return (
    <View style={postListStyles.listContainer}>
      {posts.map((post, index) => {
        return (
          <PostEntry
            key={post.id}
            post={post}
            onCardClick={() => handleSelectedPostClick(index)}
            onHugClick={handleHugClick}
            index={index}
          />
        );
      })}
    </View>
  );
};
