import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { VimeoPlayerProps } from './types';
import type { VimeoPlayer as VimeoPlayerModule } from './types/vimeo';
import VimeoPlayerWrapper from './VimeoPlayerWrapper';

import './styles.css';

const VimeoPlayer = ({ player, height = 200, width, style, iframeStyle }: VimeoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<VimeoPlayerModule | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (typeof window === 'undefined' || window.Vimeo?.Player) {
          return Promise.resolve();
        }

        if (window._vimeoApiPromise) {
          return window._vimeoApiPromise;
        }

        window._vimeoApiPromise = new Promise<void>((resolve) => {
          if (document.querySelector('script[src*="vimeo.com/api/player.js"]')) {
            let attempts = 0;
            const maxAttempts = 100;

            const checkAPI = () => {
              if (window.Vimeo?.Player) {
                resolve();
                return;
              }
              if (attempts >= maxAttempts) {
                console.error('Vimeo API failed to load after timeout');
                resolve();
                return;
              }
              attempts++;
              setTimeout(checkAPI, 100);
            };
            checkAPI();
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://player.vimeo.com/api/player.js';
          script.async = true;
          script.onload = () => {
            console.log('Vimeo API loaded');
            resolve();
          };
          document.head.appendChild(script);
        });

        return window._vimeoApiPromise;
      } catch (error) {
        console.error('Failed to create Vimeo player:', error);
      }
    };

    initialize().then(() => {
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

      vimeoPlayerRef.current = new window.Vimeo.Player(containerId, {
        url: source,
        ...options,
      });

      listeners.forEach(([event]) => {
        vimeoPlayerRef.current?.on(event, (data) => {
          player.emit(event, data);
        });
      });
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
