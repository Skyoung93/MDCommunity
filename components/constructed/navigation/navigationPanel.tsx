import { Button } from 'components/core/button';
import { Typography } from 'components/core/typography';
import { Modal as RNModal, View, TouchableOpacity } from 'react-native';
import { pageOptions, PageOptions } from 'types/pages';

type NavigationPanelProps = {
  open: boolean;
  onClose: () => void;
  navigateToPage: (page: PageOptions) => void;
};

export const NavigationPanel = ({
  open,
  onClose,
  navigateToPage,
}: NavigationPanelProps) => {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      {open && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 1,
            }}
            onPress={onClose}
          />
          <View
            style={{
              height: '100%',
              width: '80%',
              paddingTop: 75,
              backgroundColor: '#FFFFFF',
              justifyContent: 'flex-start',
              alignItems: 'center',
              zIndex: 2,
              borderRadius: 60,
            }}
          >
            <View
              style={{
                height: '100%',
                width: '100%',
                paddingHorizontal: 15,
                gap: 25,
              }}
            >
              <Typography size="pageTitle">Navigation</Typography>
              {pageOptions.map((page) => (
                <Button
                  key={`${page}`}
                  size="navigation"
                  onClick={() => {
                    navigateToPage(page as PageOptions);
                    onClose();
                  }}
                >
                  {page}
                </Button>
              ))}
            </View>
          </View>
        </View>
      )}
    </RNModal>
  );
};
