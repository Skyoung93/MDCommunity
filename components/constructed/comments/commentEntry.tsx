import React, { useState } from 'react';
import { Button } from 'components/core/button';
import { Typography } from 'components/core/typography';
import { formatDistanceToNow } from 'date-fns';
import { View } from 'react-native';
import { Comment } from 'types/comment';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDatastoreContext } from 'state/communityContext';
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
};

type CommentEntryUIProps = {
  comment: Comment;
  selectedPostIndex: number;
  depth: number;
  runningDepthThreshold: number;
  increaseRunningDepthThreshold: () => void;
  backgroundColor: string;
  textColor: string;
};

const CommentEntryUI: React.FC<CommentEntryUIProps> = ({
  comment,
  selectedPostIndex,
  depth,
  runningDepthThreshold,
  increaseRunningDepthThreshold,
  backgroundColor,
  textColor,
}) => {
  const { display_name, text, created_at, userHugged, num_hugs } = comment;
  const { updateCommentNumHugFn } = useDatastoreContext();

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
        <View style={{ padding: 10, flex: 1 }}>
          <Typography variant="default">{text}</Typography>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <Button
            variant={userHugged ? 'active' : null}
            leftIcon={
              <AntIcon
                name="hearto"
                color={userHugged ? '#edebeb' : '#2b2b2b'}
              />
            }
            onClick={clickHug}
            style={{ minWidth: 120, justifyContent: 'center' }}
          >
            {`(${num_hugs > 0 ? num_hugs : 0})`}
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
                <Typography variant="medium">Show More</Typography>
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
    />
  );
};
