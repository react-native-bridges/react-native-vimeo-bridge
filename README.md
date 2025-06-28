# React Native Vimeo Bridge

> English | [한국어](./README-ko_kr.md)

## Overview

Have you ever struggled with complex setup and manual WebView integration just to use Vimeo player in React Native?

With the lack of actively maintained Vimeo player libraries for React Native, `react-native-vimeo-bridge` provides a seamless way to integrate the [Vimeo Player JS API](https://developer.vimeo.com/player/sdk) into your React Native applications.

### Key Features

- ✅ **Full TypeScript Support** - Enhanced type safety and developer experience
- ✅ **Cross-Platform** - Works on iOS, Android, and Web
- ✅ **New Architecture Compatible** - Full support for React Native's latest architecture
- ✅ **Rich API Support** - Access to all core Vimeo Player JS API features
- ✅ **React-Native Design** - Intuitive, easy-to-use Hook-based API
- ✅ **Expo Compatible** - Ready to use in Expo projects

## Quick Start

### Examples & Demo
- [📁 Example Project](/example/) - Real implementation code and various use cases
- [🌐 Web Demo](https://react-native-vimeo-bridge-example.pages.dev/) - Try it in your browser

<p align="center">
  <img src="./assets/example.gif" width="600" />
</p>

### Installation

```bash
# npm
npm install react-native-vimeo-bridge

# pnpm
pnpm add react-native-vimeo-bridge

# yarn
yarn add react-native-vimeo-bridge

# bun
bun add react-native-vimeo-bridge
```

## Usage

### Basic Usage

```tsx
import { useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e');

  return (
    <VimeoPlayer player={player} />
  );
}
```

### Event Handling

Listen to Vimeo Player state changes in real-time. Use the `useVimeoEvent` Hook to subscribe to [events](https://github.com/vimeo/player.js/#events) in two ways.

```tsx
import { useVimeoEvent, useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e');
  
  // Method 1: Receive as state (timeupdate event supports interval configuration)
  const timeupdateState = useVimeoEvent(player, 'timeupdate', 250); // 250ms interval (default)

  // Method 2: Handle with callback
  useVimeoEvent(player, 'playing', (data) => {
    console.log('Playback started:', data);
    setIsPlaying(true);
  });

  useVimeoEvent(player, 'pause', () => {
    setIsPlaying(false);
  });

  console.log('Current time:', timeupdateState?.seconds);

  return (
    <VimeoPlayer player={player} />
  );
}
```

### Player Control

Control various player functions programmatically through Vimeo Player [methods](https://github.com/vimeo/player.js/#methods) such as play, pause, seek, volume control, and more.

```tsx
import { useVimeoEvent, useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e');

  const [isPlaying, setIsPlaying] = useState(false);

  const timeupdate = useVimeoEvent(player, 'timeupdate', 250);
  const currentTime = safeNumber(timeupdate?.seconds);

  const handlePlayPause = useCallback(async () => {
    if (isPlaying) {
      await player.pause();
    } else {
      await player.play();
    }
  }, [isPlaying, player]);

  const seekTo = useCallback(async (seconds: number) => {
    await player.setCurrentTime(seconds);
  }, [player]);

  return (
    <View>
      <VimeoPlayer player={player} />

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => seekTo(currentTime - 10)}>
          <Text>⏪ -10초</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause}>
          <Text>{isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => seekTo(currentTime + 10)}>
          <Text>⏭️ +10초</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

### Embed Options

Customize initial settings through Vimeo Player [embed options](https://developer.vimeo.com/player/sdk/embed).

```tsx
import { useVimeoPlayer, VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e', {
    autoplay: true,
    controls: true,
    loop: true,
    quality: '1080p',
    playsinline: true,
  });

  return (
    <VimeoPlayer player={player} />
  );
}
```

### Style Customization

Customize the player's iframe or webview styling.

```tsx
import { VimeoPlayer } from 'react-native-vimeo-bridge';

function App() {
  return (
    <VimeoPlayer
      player={player}
      height={400}
      width="100%"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
      // Web platform iframe styles
      iframeStyle={{
        aspectRatio: 16 / 9,
        border: 'none',
      }}
      // Mobile platform WebView styles
      webViewStyle={{
        backgroundColor: 'transparent',
      }}
      // Mobile platform WebView additional props
      webViewProps={{
        allowsFullscreenVideo: true,
        mediaPlaybackRequiresUserAction: false,
      }}
    />
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](./LICENSE)
