import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
} from 'react-native';
import { Card } from './card';

type AccordionProps = {
  Header: React.ReactNode;
  Dropdown: React.ReactNode;
  style?: ViewStyle;
};

export const Accordion: React.FC<AccordionProps> = ({
  Header,
  Dropdown,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Enable LayoutAnimation for Android
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        ...style,
      }}
    >
      <TouchableOpacity onPress={toggleExpand}>{Header}</TouchableOpacity>
      {expanded && <View>{Dropdown}</View>}
    </Card>
  );
};
