import type { ReactNode } from 'react';
import { type DimensionValue, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

type VimeoViewWrapperProps = {
  children: ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

function VimeoViewWrapper({ children, width, height, style }: VimeoViewWrapperProps) {
  const safeStyles = StyleSheet.flatten([styles.container, { width, height }, style]);

  return <View style={safeStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});

export default VimeoViewWrapper;
