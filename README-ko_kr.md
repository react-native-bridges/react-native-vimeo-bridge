# React Native Vimeo Bridge

> [English](./README.md) | 한국어

## 개요

React Native에서 Vimeo 플레이어를 사용하기 위해 복잡한 설정과 웹뷰 통합 작업을 직접 구현해야 했던 경험이 있으신가요?

현재 활발히 유지보수되는 React Native용 Vimeo 플레이어 라이브러리가 부족한 상황에서, `react-native-vimeo-bridge`는 [Vimeo Player JS API](https://developer.vimeo.com/player/sdk)를 React Native 환경에서 간편하게 활용할 수 있도록 만들어진 라이브러리입니다.

### 주요 특징

- ✅ **TypeScript 완전 지원** - 타입 안정성과 개발자 경험 향상
- ✅ **크로스 플랫폼** - iOS, Android, Web 모든 플랫폼 지원
- ✅ **New Architecture 호환** - React Native의 최신 아키텍처 완벽 지원
- ✅ **풍부한 API** - Vimeo Player JS API의 모든 핵심 기능 지원
- ✅ **React Native 개발** - Expo의 Hook 기반 방식처럼, 직관적이고 사용하기 쉬운 API를 제공
- ✅ **Expo 호환** - Expo 프로젝트에서도 바로 사용 가능
- ✅ **다중 인스턴스 지원** - 여러 플레이어를 독립적으로 관리 가능

## 빠른 시작

### 예제 및 데모
- [📁 예제 프로젝트](/example/) - 실제 구현 코드와 다양한 사용 사례
- [🌐 웹 데모](https://react-native-vimeo-bridge-example.pages.dev/) - 브라우저에서 바로 체험
- [🤖 Expo Go](https://snack.expo.dev/@harang/react-native-vimeo-bridge) - Snack Expo에서 바로 체험

<p align="center">
  <img src="./assets/example.gif" width="600" />
</p>

### 설치

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

## 사용법

### 기본 사용법

```tsx
import { useVimeoPlayer, VimeoView } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e');

  return (
    <VimeoView player={player} />
  );
}
```

### 이벤트 처리

Vimeo Player의 상태 변화를 실시간으로 감지하고 반응할 수 있습니다. `useVimeoEvent` Hook을 사용해 두 가지 방식으로 [이벤트](https://github.com/vimeo/player.js/#events)를 구독할 수 있습니다.

```tsx
import { useVimeoEvent, useVimeoPlayer, VimeoView } from 'react-native-vimeo-bridge';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e');
  
  // 방법 1: 상태로 받기 (timeupdate 이벤트는 interval 설정 가능)
  const timeupdateState = useVimeoEvent(player, 'timeupdate', 250); // 250ms 간격 (기본값)

  // 방법 2: 콜백으로 처리하기
  useVimeoEvent(player, 'playing', (data) => {
    console.log('재생 시작:', data);
    setIsPlaying(true);
  });

  useVimeoEvent(player, 'pause', () => {
    setIsPlaying(false);
  });

  console.log('현재 재생 시간:', timeupdateState?.seconds);

  return (
    <VimeoView player={player} />
  );
}
```

### 플레이어 제어

Vimeo Player의 [메서드](https://github.com/vimeo/player.js/#methods)를 통해 재생, 일시정지, 시간 이동, 볼륨 조절 등 다양한 기능을 프로그래밍 방식으로 제어할 수 있습니다.

```tsx
import { useVimeoEvent, useVimeoPlayer, VimeoView } from 'react-native-vimeo-bridge';

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
      <VimeoView player={player} />

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

### 다중 플레이어 지원

여러 플레이어를 동시에 사용할 수 있습니다.   
각 플레이어는 독립적인 인스턴스로 관리되며, 컴포넌트 unmount 시 자동으로 정리됩니다.

```tsx
import { useVimeoPlayer, VimeoView } from 'react-native-vimeo-bridge';

function App() {
 const player1 = useVimeoPlayer(vimeoUrl1);
 const player2 = useVimeoPlayer(vimeoUrl2);

 return (
   <View>
     <VimeoView player={player1} />
     <VimeoView player={player2} />
   </View>
 );
}
```

### 임베드 옵션 설정

Vimeo Player의 [임베드 옵션](https://developer.vimeo.com/player/sdk/embed)을 통해 초기 설정을 커스터마이징할 수 있습니다.

```tsx
import { useVimeoPlayer, VimeoView } from 'react-native-vimeo-bridge';

function App() {
  const player = useVimeoPlayer('https://player.vimeo.com/video/76979871?h=8272103f6e', {
    autoplay: true,
    controls: true,
    loop: true,
    quality: '1080p',
    playsinline: true,
  });

  return (
    <VimeoView player={player} />
  );
}
```

### 스타일 커스터마이징

플레이어의 iframe 또는 webview를 커스터마이징할 수 있습니다.

```tsx
import { VimeoView } from 'react-native-vimeo-bridge';

function App() {
  return (
    <VimeoView
      player={player}
      height={400}
      width="100%"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
      // 웹 플랫폼용 iframe 스타일
      iframeStyle={{
        aspectRatio: 16 / 9,
        border: 'none',
      }}
      // 모바일 플랫폼용 WebView 스타일
      webViewStyle={{
        backgroundColor: 'transparent',
      }}
      // 모바일 플랫폼용 WebView 추가 속성
      webViewProps={{
        allowsFullscreenVideo: true,
        mediaPlaybackRequiresUserAction: false,
      }}
    />
  );
}
```

### [Vimeo oEmbed API](https://developer.vimeo.com/api/oembed/videos)
`useVimeoOEmbed` 훅을 통해 Vimeo 비디오의 메타데이터를 가져올 수 있습니다.

```tsx
import { useVimeoOEmbed } from 'react-native-vimeo-bridge';

function App() {
  const { oEmbed, isLoading, error } = useVimeoOEmbed('https://player.vimeo.com/video/76979871?h=8272103f6e');

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!oEmbed) return null;

  return (
    <>
      <Text>{oEmbed.title}</Text>
      <Image 
        source={{ uri: oEmbed?.thumbnail_url }} 
        style={{ width: oEmbed?.thumbnail_width, height: oEmbed?.thumbnail_height }} 
      />
    </>
  )
}
```

## 기여하기

프로젝트 기여 방법과 개발 환경 설정에 대한 자세한 내용은 [기여 가이드](CONTRIBUTING.md)를 참고해 주세요.

## 라이선스

[MIT](./LICENSE)
