import { CommunityPage } from 'pages/communityPage';
import { CommunityDataProvider } from 'state/communityContext';

export default function App() {
  return (
    <CommunityDataProvider>
      <CommunityPage />
    </CommunityDataProvider>
  );
}
