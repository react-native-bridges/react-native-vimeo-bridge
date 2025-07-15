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
      playerRef.current = WebVimeoPlayerController.createInstance();
    });
  }, []);

  useEffect(() => {
    const source = player.getSource();

    if (isInitialized && containerRef.current && source) {
      const containerId = `vimeo-player-${Math.random().toString(36).substring(2, 15)}`;
      containerRef.current.id = containerId;
      const options = player.getOptions();

      playerRef.current?.createPlayer(containerId, {
        url: source,
        ...options,
      });

      const vimeoPlayer = playerRef.current?.getVimeoPlayer();

      const listeners = player.getListeners();

      vimeoPlayer?.on('loaded', (data) => {
        const iframe = document.getElementById(containerId)?.querySelector('iframe');

        if (iframe) {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        }

        if (listeners.has('loaded')) {
          player.emit('loaded', data);
        }

        listeners.keys().forEach((event) => {
          if (event !== 'loaded') {
            vimeoPlayer?.on(event, (data) => {
              player.emit(event, data);
            });
          }
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
