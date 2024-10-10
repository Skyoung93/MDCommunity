import { Modal as RNModal, View, TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { Card } from './card';
import { Typography } from './typography';

type ModalProps = {
  open: boolean;
  transparent?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  backgroundOpacity?: number;
  fullScreen?: boolean;
  title?: string;
};

type FullScreenModalProps = {
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
};

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  onClose,
  title,
  children,
}) => (
  <View
    style={{
      borderRadius: 15,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5, // Android specific shadow
      minHeight: 100,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      flex: 1,
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 70,
        left: 25,
        zIndex: 3,
      }}
    >
      <TouchableOpacity onPress={onClose}>
        <AntIcon
          name="arrowleft"
          size={30}
        />
      </TouchableOpacity>
      {title && (
        <Typography
          size="title"
          style={{ marginLeft: 10 }}
        >
          {title}
        </Typography>
      )}
    </View>

    <View
      style={{
        paddingTop: 110,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </View>
  </View>
);

type RegularModalProps = {
  onClose?: () => void;
  children: React.ReactNode;
};
const RegularModal: React.FC<RegularModalProps> = ({ onClose, children }) => (
  <Card
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      width: 'auto',
      backgroundColor: 'white',
    }}
  >
    <TouchableOpacity
      onPress={onClose}
      style={{
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 3,
      }}
    >
      <AntIcon
        name="closecircleo"
        size={30}
      />
    </TouchableOpacity>

    <View
      style={{
        paddingTop: 50,
        paddingBottom: 25,
      }}
    >
      {children}
    </View>
  </Card>
);

export const Modal: React.FC<ModalProps> = ({
  open,
  transparent = true,
  onClose,
  children,
  backgroundOpacity = 0.8,
  fullScreen = false,
  title,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={transparent}
      visible={open}
      onRequestClose={onClose}
    >
      {open && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: fullScreen
              ? 'transparent'
              : `rgba(0, 0, 0, ${backgroundOpacity})`,
          }}
        >
          {!fullScreen && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 1,
              }}
              onPress={onClose}
            />
          )}

          {fullScreen ? (
            <FullScreenModal
              onClose={onClose}
              title={title}
            >
              {children}
            </FullScreenModal>
          ) : (
            <RegularModal onClose={onClose}>{children}</RegularModal>
          )}
        </View>
      )}
    </RNModal>
  );
};
