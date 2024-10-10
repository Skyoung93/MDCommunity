import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export type StepType = {
  label: string;
  completed: boolean;
  onClick?: () => void;
};

type VerticalProgressBarProps = {
  steps: StepType[];
  colors: string[];
};

export const VerticalProgressBar = ({
  steps,
  colors,
}: VerticalProgressBarProps) => {
  return (
    <View
      style={{
        justifyContent: 'space-between', // Evenly distribute the circles and lines
      }}
    >
      {steps.map((step, index) => (
        <View
          key={index}
          style={{
            alignItems: 'center',
            flexDirection: 'column', // Column layout for circles and lines

            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              borderWidth: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors[index],
              backgroundColor: step.completed ? colors[index] : 'transparent', // Fill color if completed
            }}
            onPress={step.onClick}
          >
            {step.completed && (
              <IonIcon
                name="checkmark"
                size={26}
                color="#FFF" // White check mark
              />
            )}
          </TouchableOpacity>

          {index < steps.length - 1 && (
            <LinearGradient
              colors={[colors[index], colors[index + 1]]}
              style={{
                width: 6,
                flex: 1,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};
