import { PostList } from 'components/constructed/postList/postList';
import { Badge } from 'components/core/badge';
import LoadingComponent from 'components/core/loading';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Post } from 'types/post';
import { debounceFn } from 'utils/debounceFn';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { UpdatePostAPI } from 'api/updatePostAPI';
import StatusCode from 'types/statusCodes';
import { Modal } from 'components/core/modal';
import { CommunityPostCard } from 'components/constructed/communityPost/communityPostCard';
import { useDatastoreContext } from 'state/communityContext';
import { Card } from 'components/core/card';
import { Typography } from 'components/core/typography';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetPostsService } from 'services/getPostsService';

export const CommunityPage = (): React.ReactNode => {
  const {
    metaData,
    setMetaData,

    posts,
    addToPosts,

    selectedPostIndex,
    setSelectedPostIndex,
    selectedPost,

    updatePostNumHugFn,
  } = useDatastoreContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPostIndex(undefined);
  };

  const scrollPositionRef = useRef<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollingCB = () =>
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: scrollPositionRef.current + 20,
          animated: true,
        });
      }
    }, 40);

  useEffect(() => {
    const InitialLoad = async () => {
      const initialPosts = await GetPostsService({ page: 1 });
      if (initialPosts !== StatusCode.FAIL) {
        // If using redux, no need for this logic
        const { metadata, posts } = initialPosts;
        setMetaData(metadata);
        addToPosts(posts, scrollingCB);
        // Code would instead be used to handle UI aspects, like loading icons
      }
    };
    InitialLoad().catch((error) => console.log(error));
  }, []);

  const fetchNextPage = async () => {
    if (metaData.next === null) {
      return;
    }

    const newPosts = await GetPostsService({ page: metaData.next });
    if (newPosts !== StatusCode.FAIL) {
      // If using redux, no need for this logic
      const { metadata, posts } = newPosts;
      setMetaData(metadata);
      addToPosts(posts, scrollingCB);
      // Code would instead be used to handle UI aspects, like loading icons
    }
  };

  const handleSelectedPostClick = (index: number) => {
    setShowModal(true);
    setSelectedPostIndex(index);
  };

  const handleHugClick = async (index: number, userHugged: boolean) => {
    const response = await updatePostNumHugFn(index, userHugged);
    if (response === StatusCode.FAIL) {
      console.error('ERROR!!!');
    }
  };

  // Debounce FetchNextPage function
  const debouncedFetchNextPage = useCallback(debounceFn(fetchNextPage, 300), [
    metaData,
  ]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const offsetY = event.nativeEvent.contentOffset.y;

    // Save the current scroll position in the ref
    scrollPositionRef.current = offsetY;

    // Check if scrolled to the bottom
    if (offsetY + layoutHeight >= contentHeight) {
      debouncedFetchNextPage();
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.content}
        onScrollEndDrag={handleScroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Card
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: Dimensions.get('window').width * 0.97,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MCIcon
              name="meditation"
              style={{
                fontSize: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="title"
              style={{ fontSize: 35 }}
            >
              MD and We
            </Typography>
            <Typography>Welcome to the Community!</Typography>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FAIcon
              name="group"
              style={{ fontSize: 40 }}
            />
          </View>
        </Card>
        <PostList
          posts={posts}
          handleSelectedPostClick={handleSelectedPostClick}
          handleHugClick={handleHugClick}
        />
        {metaData.next === null && metaData.prev !== null ? (
          <Badge
            size="medium"
            variant="success"
            leftIcon={
              <AntIcon
                name="check"
                style={{ transform: [{ scale: 2.0 }] }}
              />
            }
          >
            That's All Folks!
          </Badge>
        ) : (
          <LoadingComponent
            variant="large"
            style={{ color: 'white' }}
          />
        )}
      </ScrollView>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title="Community Post"
        fullScreen
      >
        <CommunityPostCard
          selectedPostIndex={selectedPostIndex}
          selectedPost={selectedPost}
          handlePostHugClick={handleHugClick}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    gap: 10,
    width: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
