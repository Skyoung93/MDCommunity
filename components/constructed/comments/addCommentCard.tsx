import { Badge } from 'components/core/badge';
import { Button } from 'components/core/button';
import { Card } from 'components/core/card';
import Input from 'components/core/input';
import { Typography } from 'components/core/typography';
import { formatDistanceToNow } from 'date-fns';
import { KeyboardAvoidingView, View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Comment, FocusedEntryType } from 'types/comment';
import { convertToHexCode } from 'utils/convertToHexCode';
import { useState } from 'react';
import { Post } from 'types/post';
import { useDatastoreContext } from 'state/communityContext';
import { useUserContext } from 'state/userContext';
import StatusCode from 'types/statusCodes';

type AddCommentCardProps = {
  focusedEntry: FocusedEntryType;
  closeCommentsCard: () => void;
};

export const AddCommentCard: React.FC<AddCommentCardProps> = ({
  focusedEntry,
  closeCommentsCard,
}) => {
  const { index, comment, post } = focusedEntry;

  if (comment !== undefined) {
    return (
      <AddCommentToCommentCard
        comment={comment}
        index={index}
        closeCommentsCard={closeCommentsCard}
      />
    );
  }
  if (post !== undefined) {
    return (
      <AddCommentToPostCard
        post={post}
        index={index}
        closeCommentsCard={closeCommentsCard}
      />
    );
  }

  return null;
};

type AddToCommentProps = {
  index: number;
  comment: Comment;
  closeCommentsCard: () => void;
};
const AddCommentToCommentCard: React.FC<AddToCommentProps> = ({
  index,
  comment,
  closeCommentsCard,
}) => {
  const { addCommentToCommentFn } = useDatastoreContext();
  const { name } = useUserContext();
  const { id: commentID, text, display_name, created_at } = comment;
  const { backgroundColor, textColor } = convertToHexCode(display_name);
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = async () => {
    if (inputText === '') return;
    const response = await addCommentToCommentFn(
      index,
      commentID,
      inputText,
      name
    );
    if (response !== StatusCode.FAIL) {
      closeCommentsCard();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <View style={{ padding: 10 }}>
        <Card style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Badge
              leftIcon={
                <MCIcon
                  name="account"
                  size={30}
                  color={textColor}
                />
              }
              style={{ backgroundColor }}
            >
              <Typography
                variant="default"
                style={{ fontWeight: 'bold', color: textColor }}
              >
                {display_name}
              </Typography>
            </Badge>
            <Typography variant="small">
              {formatDistanceToNow(created_at, { addSuffix: true })}
            </Typography>
          </View>
          <View style={{ padding: 10 }}>
            <Typography variant="default">{text}</Typography>
          </View>
        </Card>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
        <Card
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              inputStyle={{ paddingBottom: 5, minHeight: 100 }}
              multiline
              style={{ flexGrow: 1 }}
              value={inputText}
              onChange={setInputText}
            />
          </View>
          <Button
            size="medium"
            leftIcon={
              <FAIcon
                name="arrow-circle-o-up"
                size={23}
              />
            }
            onClick={handleSendMessage}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

type AddToPostProps = {
  post: Post;
  index: number;
  closeCommentsCard: () => void;
};
const AddCommentToPostCard: React.FC<AddToPostProps> = ({
  post,
  index,
  closeCommentsCard,
}) => {
  const { addCommentToPostFn } = useDatastoreContext();
  const { name } = useUserContext();
  const { post_url, created_at, title } = post;
  const { backgroundColor, textColor } = convertToHexCode(post_url);
  const [inputText, setInputText] = useState<string>('');

  const userInfo = title.substring(0, 5).trim();
  const titleInfo = title.substring(5).trim();

  const handleSendMessage = async () => {
    if (inputText === '') return;
    const response = await addCommentToPostFn(index, inputText, name);
    if (response !== StatusCode.FAIL) {
      closeCommentsCard();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <View style={{ padding: 10 }}>
        <Card style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Badge
              leftIcon={
                <MCIcon
                  name="account"
                  size={30}
                  color={textColor}
                />
              }
              style={{ backgroundColor }}
            >
              <Typography
                variant="default"
                style={{ fontWeight: 'bold', color: textColor }}
              >
                {userInfo}
              </Typography>
            </Badge>
            <Typography variant="small">
              {formatDistanceToNow(created_at, { addSuffix: true })}
            </Typography>
          </View>
          <View style={{ padding: 10 }}>
            <Typography variant="default">{titleInfo}</Typography>
          </View>
        </Card>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
        <Card
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              inputStyle={{ paddingBottom: 5, minHeight: 100 }}
              multiline
              style={{ flexGrow: 1 }}
              value={inputText}
              onChange={setInputText}
            />
          </View>
          <Button
            size="medium"
            leftIcon={
              <FAIcon
                name="arrow-circle-o-up"
                size={23}
              />
            }
            onClick={handleSendMessage}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};
