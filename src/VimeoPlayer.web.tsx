import { forwardRef, useRef } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import type { VimeoPlayerProps } from './types';
import VimeoPlayerWrapper from './VimeoPlayerWrapper';

const { width: screenWidth } = Dimensions.get('window');

const VimeoPlayer = forwardRef<HTMLDivElement, VimeoPlayerProps>(
  ({ player, height = 200, width = screenWidth, style, iframeStyle }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width: screenWidth } = useWindowDimensions();

    return (
      <VimeoPlayerWrapper width={width ?? screenWidth} height={height} style={style}>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            ...iframeStyle,
          }}
        />
      </VimeoPlayerWrapper>
    );
  },
);

VimeoPlayer.displayName = 'VimeoPlayer';

export default VimeoPlayer;
