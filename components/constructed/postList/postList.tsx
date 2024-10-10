import React, { useState } from 'react';
import { View } from 'react-native';
import { Post } from 'types/post';
import { PostEntry } from './postEntry';
import { FocusedEntryType } from 'types/comment';
import { AddCommentCard } from '../comments/addCommentCard';
import { Modal } from 'components/core/modal';

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
  const [focusedEntry, setFocusedEntry] = useState<
    FocusedEntryType | undefined
  >(undefined);
  const closeCommentsCard = () => setFocusedEntry(undefined);

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        gap: 25,
      }}
    >
      {posts.map((post, index) => {
        return (
          <PostEntry
            key={post.id}
            post={post}
            onCardClick={() => handleSelectedPostClick(index)}
            onHugClick={handleHugClick}
            index={index}
            setFocusedEntry={setFocusedEntry}
          />
        );
      })}
      <Modal
        open={focusedEntry !== undefined}
        onClose={closeCommentsCard}
        title="Reply To Post"
        fullScreen
      >
        <AddCommentCard
          focusedEntry={focusedEntry}
          closeCommentsCard={closeCommentsCard}
        />
      </Modal>
    </View>
  );
};
