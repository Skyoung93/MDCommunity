import { Typography } from 'components/core/typography';
import { CommunityPage } from 'pages/communityPage';
import { ErrorPage } from 'pages/errorPage';
import { JourneyPage } from 'pages/journeyPage';
import { useState } from 'react';
import { View } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { Button } from 'components/core/button';
import { Settings } from 'components/constructed/settings/settings';
import { Modal } from 'components/core/modal';
import { NavigationPanel } from 'components/constructed/navigation/navigationPanel';
import { pageOptions, PageOptions } from 'types/pages';
import { UserDataProvider } from 'state/userContext';

export default function App() {
  return (
    <UserDataProvider>
      <AppContent />
    </UserDataProvider>
  );
}

const AppContent = () => {
  const [page, setPage] = useState<PageOptions>(pageOptions[0]);
  const [showSettingModal, setShowSettingModal] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  return (
    <View
      style={{
        backgroundColor: '#F5F6FA',
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 45,
          paddingHorizontal: 30,

          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 125,
        }}
      >
        <Button onClick={() => setShowSettingModal(true)}>
          <AntIcon
            name="setting"
            style={{
              fontSize: 35,
            }}
          />
        </Button>
        <Modal
          open={showSettingModal}
          onClose={() => setShowSettingModal(false)}
          title="User Settings"
        >
          <Settings onClose={() => setShowSettingModal(false)} />
        </Modal>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography size="pageTitle">{page}</Typography>
        </View>
        <Button onClick={() => setShowNavigation(true)}>
          <FoundationIcon
            name="list"
            style={{ fontSize: 40 }}
          />
        </Button>
        <NavigationPanel
          currentPage={page}
          open={showNavigation}
          navigateToPage={setPage}
          onClose={() => setShowNavigation(false)}
        />
      </View>
      <PageRouter page={page} />
    </View>
  );
};

type PageRouterProps = { page: PageOptions };
const PageRouter = ({ page }: PageRouterProps) => {
  switch (page) {
    case 'Journeys': {
      return <JourneyPage />;
    }
    case 'Community': {
      return <CommunityPage />;
    }
    default: {
      return <ErrorPage />;
    }
  }
};
