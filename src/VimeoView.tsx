import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type DataDetectorTypes, Dimensions, StyleSheet } from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import WebviewVimeoPlayerController from './module/WebviewVimeoPlayerController';
import { INTERNAL_SET_CONTROLLER_INSTANCE } from './symbol';
import type { VimeoViewProps } from './types';
import type { CommandResult, ReadyResult } from './types/message';
import type { VimeoPlayerEventMap } from './types/vimeo';
import { webviewScripts } from './utils/webviewScripts';
import VimeoViewWrapper from './VimeoViewWrapper';

const { width: screenWidth } = Dimensions.get('window');

function VimeoView({ player, height = 200, width = screenWidth, style, webViewProps, webViewStyle }: VimeoViewProps) {
  const webViewRef = useRef<WebView>(null);
  const playerRef = useRef<WebviewVimeoPlayerController>(null);

  const [isReady, setIsReady] = useState(false);

  const dataDetectorTypes = useMemo(() => ['none'] as DataDetectorTypes[], []);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const response = JSON.parse(event.nativeEvent.data) as
        | {
            type: keyof VimeoPlayerEventMap;
            data: VimeoPlayerEventMap[keyof VimeoPlayerEventMap];
          }
        | CommandResult
        | ReadyResult
        | null;

      if (!response) {
        return;
      }

      if (response.type === 'onReady') {
        setIsReady(true);
        return;
      }

      if (response.type === 'commandResult') {
        if (!playerRef.current) {
          console.warn('Player controller not available for command result');
          return;
        }

        const pendingCommands = playerRef.current?.getPendingCommands();

        const resolver = pendingCommands?.get(response.id);
        if (resolver) {
          resolver(response.data);
          pendingCommands?.delete(response.id);
        }
        return;
      }

      if (player.hasListeners(response.type)) {
        player.emit(response.type, response.data);
      }
    },
    [player],
  );

  const createPlayerHTML = useCallback(() => {
    const sourceUri = player.getSource();

    if (sourceUri === null) {
      return '<html><body><div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: #fff;">Invalid Vimeo URL</div></body></html>';
    }

    const embedOptions = player.getOptions();

    const options = {
      url: sourceUri,
      ...embedOptions,
    };

    return /* html */ `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                background-color: #000;
                overflow: hidden;
              }
              #vimeo-player {
                width: 100%;
                height: 100vh;
              }
              iframe {
                width: 100%;
                height: 100%;
              }
            </style>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </head>
          <body>
            <div id="vimeo-player"></div>
            <script>
              (function() {
                'use strict';

                const player = new Vimeo.Player('vimeo-player', ${JSON.stringify(options)});

                const sendMessage = (type) => (data) => {
                  if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type,
                      data,
                    }));
                  }
                };

                if (player) {
                  sendMessage('onReady')(null);

                  player.on('play', sendMessage('play'));
                  player.on('playing', sendMessage('playing'));
                  player.on('pause', sendMessage('pause'));
                  player.on('ended', sendMessage('ended'));
                  player.on('timeupdate', sendMessage('timeupdate'));
                  player.on('progress', sendMessage('progress'));
                  player.on('seeking', sendMessage('seeking'));
                  player.on('seeked', sendMessage('seeked'));
                  player.on('texttrackchange', sendMessage('texttrackchange'));
                  player.on('chapterchange', sendMessage('chapterchange'));
                  player.on('cuechange', sendMessage('cuechange'));
                  player.on('cuepoint', sendMessage('cuepoint'));
                  player.on('volumechange', sendMessage('volumechange'));
                  player.on('playbackratechange', sendMessage('playbackratechange'));
                  player.on('bufferstart', sendMessage('bufferstart'));
                  player.on('bufferend', sendMessage('bufferend'));
                  player.on('error', sendMessage('error'));
                  player.on('loaded', (data) => {
                    sendMessage('loaded')(data);
                    
                    const iframe = document.querySelector('iframe');
                    if (iframe) {
                      iframe.style.width = '100%';
                      iframe.style.height = '100%';
                    }
                  });
                  player.on('durationchange', sendMessage('durationchange'));
                  player.on('fullscreenchange', sendMessage('fullscreenchange'));
                  player.on('qualitychange', sendMessage('qualitychange'));
                  player.on('camerachange', sendMessage('camerachange'));
                  player.on('resize', sendMessage('resize'));
                  player.on('enterpictureinpicture', sendMessage('enterpictureinpicture'));
                  player.on('leavepictureinpicture', sendMessage('leavepictureinpicture'));
                  ${webviewScripts.receiveMessage}
  
                  window.playerCommands = {
                    play: () => player.play(),
                    pause: () => player.pause(),
                    unload: () => player.unload(),
                    setCurrentTime: (seconds) => player.setCurrentTime(seconds),
                    setVolume: (volume) => player.setVolume(volume),
                    setMuted: (muted) => player.setMuted(muted),
                    getCurrentTime: () => player.getCurrentTime(),
                    getDuration: () => player.getDuration(),
                    setPlaybackRate: (rate) => player.setPlaybackRate(rate),
                    getPlaybackRate: () => player.getPlaybackRate(),
                    getVideoId: () => player.getVideoId(),
                    getVideoTitle: () => player.getVideoTitle(),
                    getVideoWidth: () => player.getVideoWidth(),
                    getVideoHeight: () => player.getVideoHeight(),
                    getVideoUrl: () => player.getVideoUrl(),
                    destroy: () => {
                      player.off('play');
                      player.off('playing');
                      player.off('pause');
                      player.off('ended');
                      player.off('timeupdate');
                      player.off('progress');
                      player.off('seeking');
                      player.off('seeked');
                      player.off('texttrackchange');
                      player.off('chapterchange');
                      player.off('cuechange');
                      player.off('cuepoint');
                      player.off('volumechange');
                      player.off('playbackratechange');
                      player.off('bufferstart');
                      player.off('bufferend');
                      player.off('error');
                      player.off('loaded');
                      player.off('durationchange');
                      player.off('fullscreenchange');
                      player.off('qualitychange');
                      player.off('camerachange');
                      player.off('resize');
                      player.off('enterpictureinpicture');
                      player.off('leavepictureinpicture');
                      player.destroy();
                    },
                    off: (event) => player.off(event),
                  }
                }
              })();
            </script>
          </body>
        </html>
      `;
  }, [player]);

  useEffect(() => {
    if (isReady && webViewRef.current) {
      const controller = WebviewVimeoPlayerController.createInstance(webViewRef);

      playerRef.current = controller;

      player[INTERNAL_SET_CONTROLLER_INSTANCE](controller);
    }
  }, [isReady, player]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <VimeoViewWrapper width={width} height={height} style={style}>
      <WebView
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        bounces={false}
        scrollEnabled={false}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        style={[styles.webView, webViewStyle]}
        // iOS specific props
        allowsLinkPreview={false}
        dataDetectorTypes={dataDetectorTypes}
        // Android specific props
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={false}
        webviewDebuggingEnabled={__DEV__}
        {...webViewProps}
        ref={webViewRef}
        javaScriptEnabled
        source={{ html: createPlayerHTML() }}
        onMessage={handleMessage}
      />
    </VimeoViewWrapper>
  );
}

const styles = StyleSheet.create({
  webView: {
    backgroundColor: 'transparent',
  },
});

export default VimeoView;
