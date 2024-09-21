import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'components/core/badge';
import { Button } from 'components/core/button';
import { Card } from 'components/core/card';
import { Typography } from 'components/core/typography';
import { formatDistanceToNow } from 'date-fns';
import Markdown from 'react-native-markdown-display';
import { FocusedEntryType } from 'types/comment';
import { Modal } from 'components/core/modal';
import { AddCommentCard } from '../comments/addCommentCard';
import { Post } from 'types/post';

const iconScale = 1.75;

type PostDataCardProps = {
  // title: string;
  // patient_description: string;
  // assessment: string;
  // created_at: string;
  // num_hugs: number;
  // commentCount: number;
  // userHugged: boolean;
  post: Post;
  selectedPostIndex: number;
  handleHugClick: (index: number, userHugged: boolean) => void;
};

export const PostDataCard: React.FC<PostDataCardProps> = ({
  post,
  selectedPostIndex,
  handleHugClick,
}) => {
  const {
    userHugged,
    assessment,
    title,
    patient_description,
    num_hugs,
    comments,
    created_at,
  } = post;
  const commentCount = Object.keys(comments).length + 1;
  const clickHug = () => {
    handleHugClick(selectedPostIndex, !userHugged);
  };

  const [showDescription, setShowDescription] = useState<boolean>(false);
  const toggleShowDescription = () => setShowDescription(!showDescription);
  const [showAssessment, setShowAssessment] = useState<boolean>(false);
  const toggleShowAssessment = () => setShowAssessment(!showAssessment);
  const [isAssessmentTruncated, setIsAssessmentTruncated] =
    useState<boolean>(false);

  // Adjust this value based on your line height
  const lineHeight = 27;
  const maxHeight = lineHeight * 4;

  useEffect(() => {
    // Implement your logic to determine if truncation is needed
    setIsAssessmentTruncated(true); // Replace with actual logic if necessary
  }, [assessment]);

  const [focusedEntry, setFocusedEntry] = useState<
    FocusedEntryType | undefined
  >(undefined);
  const closeCommentsCard = () => setFocusedEntry(undefined);

  return (
    <Card style={{ gap: 20, padding: 20, width: '100%' }}>
      <Typography variant="title">{title}</Typography>
      <View
        style={{
          gap: 8,
          width: '100%',
        }}
      >
        <Button
          onClick={toggleShowDescription}
          size="large"
          leftIcon={
            <AntIcon
              name="profile"
              style={{ transform: [{ scale: iconScale }] }}
            />
          }
          variant="success"
          rightIcon={
            showDescription ? (
              <FAIcon
                name="chevron-up"
                style={{ transform: [{ scale: iconScale }] }}
              />
            ) : (
              <FAIcon
                name="chevron-down"
                style={{ transform: [{ scale: iconScale }] }}
              />
            )
          }
        >
          Description
        </Button>
        <Card
          style={{
            backgroundColor: '#27e65a',
            gap: 15,
            padding: 15,
            width: '100%',
          }}
        >
          <Typography numberOfLines={showDescription ? null : 4}>
            {patient_description}
          </Typography>
          <TouchableOpacity
            onPress={toggleShowDescription}
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Typography
              variant="medium"
              style={{ fontWeight: 'bold' }}
            >
              {showDescription ? 'Show Less' : 'Show More'}
            </Typography>
          </TouchableOpacity>
        </Card>
      </View>
      <View
        style={{
          gap: 8,
          width: '100%',
        }}
      >
        <Button
          onClick={toggleShowAssessment}
          size="large"
          leftIcon={
            <IonIcon
              style={{ transform: [{ scale: iconScale }] }}
              name="sparkles-sharp"
            />
          }
          rightIcon={
            showAssessment ? (
              <FAIcon
                name="chevron-up"
                style={{ transform: [{ scale: iconScale }] }}
              />
            ) : (
              <FAIcon
                name="chevron-down"
                style={{ transform: [{ scale: iconScale }] }}
              />
            )
          }
          variant="warning"
        >
          Chatbot Assessment
        </Button>
        <Card
          style={{
            backgroundColor: '#e0e32d',
            gap: 15,
            padding: 15,
            width: '100%',
          }}
        >
          <View>
            <View
              style={{
                overflow: 'hidden',
                maxHeight: showAssessment ? null : maxHeight,
                padding: 4,
              }}
            >
              <Markdown
                style={{
                  heading3: {
                    fontSize: 20,
                    color: '#2b2b2b',
                    fontWeight: '900',
                    textDecorationLine: 'underline',
                    marginBottom: 6,
                  },
                  paragraph: {
                    fontSize: 18,
                    color: '#2b2b2b',
                    marginBottom: 12,
                  },
                  list_item: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2b2b2b',
                    marginBottom: 6,
                  },
                }}
              >
                {assessment}
              </Markdown>
            </View>
            {isAssessmentTruncated && !showAssessment ? (
              <Text style={{ marginTop: -5 }}>{'  ...'}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={toggleShowAssessment}
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Typography
              variant="medium"
              style={{ fontWeight: 'bold' }}
            >
              {showAssessment ? 'Show Less' : 'Show More'}
            </Typography>
          </TouchableOpacity>
        </Card>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Button
            variant={userHugged ? 'active' : undefined}
            leftIcon={
              <AntIcon
                name="hearto"
                color={userHugged ? '#edebeb' : '#2b2b2b'}
              />
            }
            onClick={clickHug}
            style={{ justifyContent: 'center' }}
          >
            {`${num_hugs > 0 ? num_hugs : 0}`}
          </Button>
          <Badge
            leftIcon={
              <FAIcon
                name="comment-o"
                style={{ transform: [{ scale: 1.25 }], paddingBottom: 2 }}
              />
            }
          >
            {`${commentCount > 0 ? commentCount : 0}`}
          </Badge>
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
                post,
              })
            }
            style={{ justifyContent: 'center', paddingHorizontal: 20 }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="default"
            style={{ color: '#2b2b2b', fontWeight: 'bold' }}
          >
            {formatDistanceToNow(created_at, { addSuffix: true })}
          </Typography>
        </View>
      </View>
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
    </Card>
  );
};
