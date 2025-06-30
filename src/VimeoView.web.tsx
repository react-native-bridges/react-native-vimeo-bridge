import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import WebVimeoPlayerController from './module/WebVimeoPlayerController';
import { INTERNAL_SET_CONTROLLER_INSTANCE } from './symbol';
import type { VimeoViewProps } from './types';
import VimeoViewWrapper from './VimeoViewWrapper';

function VimeoView({ player, height = 200, width, style, iframeStyle }: VimeoViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<WebVimeoPlayerController | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);

  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    WebVimeoPlayerController.initialize().then(() => {
      setIsInitialized(true);
      playerRef.current = WebVimeoPlayerController.getInstance();
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

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <VimeoViewWrapper width={width ?? screenWidth} height={height} style={style}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          ...iframeStyle,
        }}
      />
    </VimeoViewWrapper>
  );
}

export default VimeoView;
