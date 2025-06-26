import type { CSSProperties } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';
import type { WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';
import type VimeoPlayerInstance from '../module/VimeoPlayerInstance';
import type { VimeoPlayerEventMap } from './iframe';

export type VimeoSource =
  | string
  | {
      url: string;
    };

export type VimeoPlayerStatus = Omit<
  VimeoPlayerEventMap,
  'bufferend' | 'bufferstart' | 'enterpictureinpicture' | 'leavepictureinpicture'
>;

export type VimeoPlayerEvent = keyof VimeoPlayerEventMap;

export type VimeoPlayerProps = {
  player: VimeoPlayerInstance;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  iframeStyle?: CSSProperties;
  webViewProps?: Omit<WebViewProps, 'ref' | 'source' | 'style' | 'onMessage' | 'javaScriptEnabled' | 'onError'> & {
    source?: Omit<WebViewSourceUri, 'uri'>;
  };
  webViewStyle?: StyleProp<ViewStyle>;
};
