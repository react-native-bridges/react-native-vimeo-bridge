import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import WebVimeoPlayerController from './module/WebVimeoPlayerController';
import type { VimeoPlayerProps } from './types';
import VimeoPlayerWrapper from './VimeoPlayerWrapper';

import './styles.css';
import { INTERNAL_SET_CONTROLLER_INSTANCE } from './symbol';

const VimeoPlayer = ({ player, height = 200, width, style, iframeStyle }: VimeoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const playerRef = useRef<WebVimeoPlayerController>(WebVimeoPlayerController.getInstance());

  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    WebVimeoPlayerController.initialize().then(() => {
      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    const source = player.getSource();
    const listeners = player.getListeners();

    if (isInitialized && containerRef.current && source) {
      const containerId = `vimeo-player`;
      containerRef.current.id = containerId;
      const options = player.getOptions();

      playerRef.current?.createPlayer(containerId, {
        url: source,
        ...options,
      });

      const vimeoPlayer = playerRef.current?.getVimeoPlayer();

      listeners.keys().forEach((event) => {
        vimeoPlayer?.on(event, (data) => {
          player.emit(event, data);
        });
      });

      player[INTERNAL_SET_CONTROLLER_INSTANCE](playerRef.current);
    }
  }, [isInitialized, player]);

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
};

VimeoPlayer.displayName = 'VimeoPlayer';

export default VimeoPlayer;
