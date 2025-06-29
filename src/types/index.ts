import type { CSSProperties } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';
import type { WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';
import type VimeoPlayerInstance from '../module/VimeoPlayerInstance';
import type { VimeoPlayerEventMap, VimeoPlayerOptions } from './vimeo';

export type VimeoSource =
  | string
  | {
      url: string;
    };

export type VimeoPlayerStatus = Omit<
  VimeoPlayerEventMap,
  'bufferend' | 'bufferstart' | 'enterpictureinpicture' | 'leavepictureinpicture'
>;

export type VimeoPlayerProps = {
  player: VimeoPlayerInstance;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  /**
   * @description Style for the iframe element
   * @platform web
   */
  iframeStyle?: CSSProperties;
  /**
   * @description Props for the webview element
   * @platform ios, android
   */
  webViewProps?: Omit<WebViewProps, 'ref' | 'source' | 'style' | 'onMessage' | 'javaScriptEnabled' | 'onError'> & {
    source?: Omit<WebViewSourceUri, 'uri'>;
  };
  /**
   * @description Style for the webview element
   * @platform ios, android
   */
  webViewStyle?: StyleProp<ViewStyle>;
};

export type VimeoEmbedOptions = Omit<VimeoPlayerOptions, 'id' | 'url'> & {
  width?: number;
  height?: number;
  maxwidth?: number;
  maxheight?: number;
  responsive?: boolean;
};
