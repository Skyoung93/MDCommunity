import { PostList } from 'components/constructed/postList/postList';
import { Badge } from 'components/core/badge';
import LoadingComponent from 'components/core/loading';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { debounceFn } from 'utils/debounceFn';
import StatusCode from 'types/statusCodes';
import { Modal } from 'components/core/modal';
import { CommunityPostCard } from 'components/constructed/communityPost/communityPostCard';

import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { GetPostsService } from 'services/posts/getPostsService';
import {
  CommunityDataProvider,
  useCommunityContext,
} from 'state/communityContext';

export const CommunityPage = (): React.ReactNode => {
  return (
    <CommunityDataProvider>
      <CommunityPageContent />
    </CommunityDataProvider>
  );
};

const CommunityPageContent = (): React.ReactNode => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const {
    metaData,
    setMetaData,

    posts,
    addToPosts,

    selectedPostIndex,
    setSelectedPostIndex,
    selectedPost,

    updatePostNumHugFn,
  } = useCommunityContext();

  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedPostIndex(undefined);
  };

  const scrollPositionRef = useRef<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollingCB = (ms: number) =>
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: scrollPositionRef.current + ms,
          animated: true,
        });
      }
    }, 40);

  useEffect(() => {
    const InitialLoad = async () => {
      const initialPosts = await GetPostsService({ page: 1 });
      if (initialPosts !== StatusCode.FAIL) {
        const { metadata, posts } = initialPosts;
        setMetaData(metadata);
        addToPosts(posts, () => scrollingCB(20));
        setLoading(false);
      } else {
        setError(true);
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
      const { metadata, posts } = newPosts;
      setMetaData(metadata);
      addToPosts(posts, () => scrollingCB(175));
      // Code would instead be used to handle UI feedback
    } else {
      setError(true);
    }
  };

  const handleSelectedPostClick = (index: number) => {
    setShowPostModal(true);
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
    <View
      style={{
        flex: 1,
        // paddingTop: 20,
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          display: 'flex',
          gap: 10,
          width: '100%',
          paddingHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onScrollEndDrag={handleScroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <PostList
          posts={posts}
          handleSelectedPostClick={handleSelectedPostClick}
          handleHugClick={handleHugClick}
        />
        {metaData.next === null && metaData.prev !== null ? (
          <Badge
            size="medium"
            color="green"
            leftIcon={
              <AntIcon
                name="check"
                style={{ transform: [{ scale: 2.0 }] }}
              />
            }
          >
            That's All Folks!
          </Badge>
        ) : error ? (
          <Badge
            size="medium"
            color="red"
            leftIcon={
              <IonIcon
                name="alert"
                style={{ transform: [{ scale: 2.0 }], color: 'red' }}
              />
            }
            style={{
              paddingBottom: 25,
            }}
          >
            There Was An Error!
          </Badge>
        ) : (
          <View
            style={{
              width: '100%',
              paddingBottom: 40,
            }}
          >
            <LoadingComponent
              variant="large"
              style={{ color: 'white' }}
            />
          </View>
        )}
      </ScrollView>
      <Modal
        open={showPostModal}
        onClose={handleClosePostModal}
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
