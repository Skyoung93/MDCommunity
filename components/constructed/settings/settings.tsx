import { Button } from 'components/core/button';
import Input from 'components/core/input';
import { Typography } from 'components/core/typography';
import { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, View, Platform } from 'react-native';
import { useUserContext } from 'state/userContext';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import StatusCode from 'types/statusCodes';

type SettingProps = {
  onClose: () => void;
};

export const Settings: React.FC<SettingProps> = ({ onClose }) => {
  const { name, updateUserName } = useUserContext();
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (name !== '' && name !== displayName) {
      setDisplayName(name);
    }
  }, [name]);

  const handleSavingSettings = async () => {
    if (displayName === '') {
      setDisplayName(name);
      return;
    }
    const response = await updateUserName(displayName);
    if (response === StatusCode.SUCCESS) {
      onClose();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        backgroundColor: 'white',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust based on your header height
    >
      <View
        style={{
          width: '100%',
          gap: 25,
        }}
      >
        <Typography size="pageTitle">Settings</Typography>
        <View
          style={{
            gap: 10,
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          <Typography
            size="title"
            style={{
              paddingLeft: 10,
            }}
          >
            User Name
          </Typography>
          <Input
            color="dark"
            size="medium"
            value={displayName}
            onChange={setDisplayName}
          />
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Button
            color="green"
            leftIcon={
              <FAIcon
                name="save"
                size={20}
                color="green"
              />
            }
            onClick={handleSavingSettings}
          >
            Save
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
