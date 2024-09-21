import { Typography } from 'components/core/typography';
import {
  CommentDict,
  CommentsConstructor,
  FocusedEntryType,
} from 'types/comment';
import { CommentEntry } from './commentEntry';
import { View } from 'react-native';
import { useState } from 'react';
import { Modal } from 'components/core/modal';
import { AddCommentCard } from './addCommentCard';

type CommentsCardProps = {
  commentsDict: CommentDict;
  selectedPostIndex: number;
};

export const CommentsCard: React.FC<CommentsCardProps> = ({
  commentsDict,
  selectedPostIndex,
}) => {
  const commentCount = Object.keys(commentsDict).length;

  const nestedComments = CommentsConstructor(commentsDict);

  const [focusedEntry, setFocusedEntry] = useState<
    FocusedEntryType | undefined
  >(undefined);

  const closeCommentsCard = () => setFocusedEntry(undefined);

  return (
    <View>
      <Typography variant="title">{`Comments (${commentCount})`}</Typography>
      {nestedComments.map((comment) => (
        <CommentEntry
          key={comment.id}
          comment={comment}
          selectedPostIndex={selectedPostIndex}
          depth={0}
          setFocusedEntry={setFocusedEntry}
        />
      ))}
      <Modal
        open={focusedEntry !== undefined}
        onClose={closeCommentsCard}
        title="Reply To Comment"
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
