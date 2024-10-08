import { formatDistanceToNow } from 'date-fns';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'components/core/button';
import { Card } from 'components/core/card';
import { Typography } from 'components/core/typography';
import { Post } from 'types/post';
import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { CommentsCard } from '../comments/commentsCard';
import { FocusedEntryType } from 'types/comment';

type PostEntryProps = {
  post: Post;
  onCardClick?: (index: number) => void;
  onHugClick?: (index: number, userHugged: boolean) => void;
  index: number;
  setFocusedEntry: (entry: undefined | FocusedEntryType) => void;
};

export const PostEntry = ({
  post,
  onCardClick,
  onHugClick,
  index,
  setFocusedEntry,
}: PostEntryProps): React.ReactNode => {
  const { userHugged, comments } = post;
  const clickHug = () => {
    onHugClick(index, !userHugged);
  };

  const [showComments, setShowComments] = useState<boolean>(false);
  const toggleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <Card>
      <TouchableOpacity
        style={{
          gap: 3,
        }}
        onPress={() => {
          onCardClick(index);
          setShowComments(false);
        }}
      >
        <View
          style={{
            maxHeight: 100,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            padding: 20,
          }}
        >
          <Typography
            size="title"
            numberOfLines={2}
          >
            {post.title}
          </Typography>
        </View>
        <View
          style={{
            padding: 20,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
            }}
          >
            Patient Description:
          </Typography>
          <Typography
            size="default"
            numberOfLines={3}
          >
            {post.patient_description}
          </Typography>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,

            backgroundColor: '#FFFFFF',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'space-evenly',
              flexGrow: 1,
            }}
          >
            <Button
              color={userHugged ? 'red' : null}
              leftIcon={
                <AntIcon
                  name="hearto"
                  color={userHugged ? 'red' : '#2b2b2b'}
                />
              }
              onClick={clickHug}
            >
              {`${post.num_hugs > 0 ? post.num_hugs : 0}`}
            </Button>
            <Button
              onClick={toggleShowComments}
              leftIcon={
                <FAIcon
                  name="comment-o"
                  style={{ transform: [{ scale: 1.25 }], paddingBottom: 2 }}
                />
              }
            >
              {`${
                Object.keys(post.comments).length > 0
                  ? Object.keys(post.comments).length
                  : 0
              }`}
            </Button>
            <Button
              leftIcon={
                <FAIcon
                  name="reply"
                  color={'#2b2b2b'}
                />
              }
              onClick={() =>
                setFocusedEntry({
                  index,
                  post,
                })
              }
              style={{ justifyContent: 'center', paddingHorizontal: 20 }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Typography
              size="small"
              style={{ color: '#2b2b2b', fontWeight: 'bold' }}
            >
              {formatDistanceToNow(post.created_at, { addSuffix: true })}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      {showComments ? (
        <View
          style={{
            gap: 20,
            padding: 20,
            width: '100%',
            backgroundColor: '#FFFFFF',
          }}
        >
          <CommentsCard
            commentsDict={comments}
            selectedPostIndex={index}
          />
        </View>
      ) : null}
    </Card>
  );
};
