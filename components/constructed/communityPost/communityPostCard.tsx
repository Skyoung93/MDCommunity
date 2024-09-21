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

  const {
    title,
    created_at,
    patient_description,
    assessment,
    num_hugs,
    comments,
    userHugged,
  } = selectedPost;
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
        title={title}
        selectedPostIndex={selectedPostIndex}
        created_at={created_at}
        patient_description={patient_description}
        assessment={assessment}
        num_hugs={num_hugs}
        handleHugClick={handlePostHugClick}
        commentCount={Object.keys(comments).length}
        userHugged={userHugged}
      />
      <Card style={{ gap: 20, padding: 20, width: '100%' }}>
        <CommentsCard
          commentsDict={comments}
          selectedPostIndex={selectedPostIndex}
          // handleHugClick={handleCommentHugClick}
        />
      </Card>
    </ScrollView>
  );
};
