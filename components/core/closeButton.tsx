import { TouchableOpacity } from 'react-native';
import EntIcon from 'react-native-vector-icons/Entypo';

type CloseButtonProps = {
  onClick: () => void;
};

export const CloseButton = ({ onClick }: CloseButtonProps): React.ReactNode => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDEE',
        borderRadius: 15,
        overflow: 'hidden',
        height: 30,
        width: 30,
      }}
    >
      <EntIcon
        name="cross"
        size={30}
        style={{
          color: '#C1C1C3',
        }}
      />
    </TouchableOpacity>
  );
};
