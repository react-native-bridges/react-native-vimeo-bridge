import type { CSSProperties } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';
import type { WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';
import type VimeoPlayer from '../module/VimeoPlayer';
import type { EmbedOptions, VimeoPlayerEventMap } from './vimeo';

export type VimeoSource =
  | string
  | {
      url: string;
    };

export type VimeoPlayerStatus = Omit<
  VimeoPlayerEventMap,
  'bufferend' | 'bufferstart' | 'enterpictureinpicture' | 'leavepictureinpicture'
>;

export type VimeoViewProps = {
  player: VimeoPlayer;
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

export type VimeoEmbedOptions = Omit<
  EmbedOptions,
  'id' | 'url' | 'width' | 'height' | 'maxwidth' | 'maxheight' | 'responsive'
>;
