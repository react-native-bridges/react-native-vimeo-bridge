import type { ReactNode } from 'react';
import { type DimensionValue, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

type VimeoPlayerWrapperProps = {
  children: ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

function VimeoPlayerWrapper({ children, width, height, style }: VimeoPlayerWrapperProps) {
  const safeStyles = StyleSheet.flatten([styles.container, { width, height }, style]);

  return <View style={safeStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});

export default VimeoPlayerWrapper;
