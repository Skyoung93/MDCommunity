import React, { useState } from 'react';
import { Button } from 'components/core/button';
import { Typography } from 'components/core/typography';
import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';
import { Comment, FocusedEntryType } from 'types/comment';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCommunityContext } from 'state/communityContext';
import StatusCode from 'types/statusCodes';
import { Badge } from 'components/core/badge';
import { convertToHexCode } from 'utils/convertToHexCode';
import FAIcon from 'react-native-vector-icons/FontAwesome';

type CommentEntryProps = {
  comment: Comment;
  selectedPostIndex: number;
  depth: number;
  runningDepthThreshold?: number;
  increaseRunningDepthThreshold?: () => void;
  setFocusedEntry: (entry: undefined | FocusedEntryType) => void;
};

type CommentEntryUIProps = {
  comment: Comment;
  selectedPostIndex: number;
  depth: number;
  runningDepthThreshold: number;
  increaseRunningDepthThreshold: () => void;
  backgroundColor: string;
  textColor: string;
  setFocusedEntry: (entry: undefined | FocusedEntryType) => void;
};

const CommentEntryUI: React.FC<CommentEntryUIProps> = ({
  comment,
  selectedPostIndex,
  depth,
  runningDepthThreshold,
  increaseRunningDepthThreshold,
  backgroundColor,
  textColor,
  setFocusedEntry,
}) => {
  const { display_name, text, created_at, userHugged, num_hugs } = comment;
  const { updateCommentNumHugFn } = useCommunityContext();

  const clickHug = async () => {
    const response = await updateCommentNumHugFn(
      selectedPostIndex,
      comment.id,
      !userHugged
    );
    if (response === StatusCode.FAIL) {
      console.error('ERROR!!!');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 15 * (depth > 0 ? 1 : 0),
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            flex: 1,
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
              size="default"
              style={{ fontWeight: 'bold', color: textColor }}
            >
              {display_name}
            </Typography>
          </Badge>
          <Typography size="small">
            {formatDistanceToNow(created_at, { addSuffix: true })}
          </Typography>
        </View>
        <View style={{ padding: 10, flex: 1 }}>
          <Typography size="default">{text}</Typography>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
            gap: 10,
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
            style={{ justifyContent: 'center' }}
          >
            {`${num_hugs > 0 ? num_hugs : 0}`}
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
                index: selectedPostIndex,
                comment,
              })
            }
            style={{ justifyContent: 'center' }}
          >
            Reply
          </Button>
        </View>
      </View>
      {comment.children.length > 0 && (
        <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
          <View
            style={{
              height: '100%',
              backgroundColor: '#A0A0A0',
              width: 2,
            }}
          />
          {depth < runningDepthThreshold ? (
            comment.children.map((childComment) => (
              <CommentEntry
                key={childComment.id}
                comment={childComment}
                selectedPostIndex={selectedPostIndex}
                depth={depth + 1}
                runningDepthThreshold={runningDepthThreshold}
                increaseRunningDepthThreshold={increaseRunningDepthThreshold}
                setFocusedEntry={setFocusedEntry}
              />
            ))
          ) : (
            <View
              style={{
                alignItems: 'flex-start',
                paddingLeft: 15,
                width: '100%',
                padding: 5,
              }}
            >
              <Button
                leftIcon={
                  <FAIcon
                    name="plus"
                    size={20}
                  />
                }
                onClick={increaseRunningDepthThreshold}
              >
                <Typography size="medium">Show More</Typography>
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export const CommentEntry: React.FC<CommentEntryProps> = ({
  comment,
  selectedPostIndex,
  depth,
  runningDepthThreshold,
  increaseRunningDepthThreshold,
  setFocusedEntry,
}) => {
  const { backgroundColor, textColor } = convertToHexCode(comment.display_name);
  const [depthThreshold, setDepthThreshold] = useState<number>(1);
  const increaseDepthThreshold = () => {
    setDepthThreshold((prev) => prev + 1);
  };

  return (
    <CommentEntryUI
      comment={comment}
      selectedPostIndex={selectedPostIndex}
      depth={depth}
      runningDepthThreshold={
        runningDepthThreshold ? runningDepthThreshold : depthThreshold
      }
      increaseRunningDepthThreshold={
        increaseRunningDepthThreshold !== undefined
          ? increaseRunningDepthThreshold
          : increaseDepthThreshold
      }
      backgroundColor={backgroundColor}
      textColor={textColor}
      setFocusedEntry={setFocusedEntry}
    />
  );
};
