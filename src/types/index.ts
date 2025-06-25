import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';
import type { WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';
import type { VimeoPlayerOptions } from './iframe';

export type VimeoSource =
  | string
  | {
      url: string;
    };

export type VimeoPlayerProps = {
  source: VimeoSource;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  embedOptions?: VimeoPlayerOptions;
  webViewProps?: Omit<WebViewProps, 'ref' | 'source' | 'style' | 'onMessage' | 'javaScriptEnabled' | 'onError'> & {
    source?: Omit<WebViewSourceUri, 'uri'>;
  };
  webViewStyle?: StyleProp<ViewStyle>;
};
