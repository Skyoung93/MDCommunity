import { CommunityPage } from 'pages/communityPage';
import { CommunityDataProvider } from 'state/communityContext';
import { UserDataProvider } from 'state/userContext';

export default function App() {
  return (
    <UserDataProvider>
      <CommunityDataProvider>
        <CommunityPage />
      </CommunityDataProvider>
    </UserDataProvider>
  );
}
