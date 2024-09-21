import { Typography } from 'components/core/typography';
import { CommentDict, CommentsConstructor } from 'types/comment';
import { CommentEntry } from './commentEntry';
import { View } from 'react-native';

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
  console.log(JSON.stringify(nestedComments, null, 2));

  return (
    <View>
      <Typography variant="title">{`Comments (${commentCount})`}</Typography>
      {nestedComments.map((comment) => (
        <CommentEntry
          key={comment.id}
          comment={comment}
          selectedPostIndex={selectedPostIndex}
          depth={0}
        />
      ))}
    </View>
  );
};
