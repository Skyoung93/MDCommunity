import React from 'react';
import { ScrollView } from 'react-native';

import { Post } from 'types/post';
import { PostDataCard } from './postDataCard';
import { CommentsCard } from '../comments/commentsCard';
import { Card } from 'components/core/card';

type CommunityPostCardProps = {
  selectedPostIndex: number | undefined;
  selectedPost: Post | undefined;
  handlePostHugClick: (index: number, userHugger: boolean) => void;
};

export const CommunityPostCard: React.FC<CommunityPostCardProps> = ({
  selectedPostIndex,
  selectedPost,
  handlePostHugClick,
  // handleCommentHugClick,
}) => {
  if (selectedPost === undefined || selectedPostIndex === undefined)
    return null;

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 30,
      }}
    >
      <PostDataCard
        post={selectedPost}
        selectedPostIndex={selectedPostIndex}
        handleHugClick={handlePostHugClick}
      />
      <Card style={{ gap: 20, padding: 20, width: '100%' }}>
        <CommentsCard
          commentsDict={selectedPost.comments}
          selectedPostIndex={selectedPostIndex}
        />
      </Card>
    </ScrollView>
  );
};
