---
"react-native-vimeo-bridge": minor
---

feat: add fullscreen control methods (requestFullscreen, exitFullscreen, getFullscreen)

Added three new methods to VimeoPlayer for fullscreen control:

- requestFullscreen(): Enter fullscreen mode
- exitFullscreen(): Exit fullscreen mode
- getFullscreen(): Get current fullscreen state

Updated example app to demonstrate fullscreen functionality with auto-exit demo.

Example usage:

```tsx
const player = useVimeoPlayer(vimeoUrl, {
  autoplay: true,
  controls: true,
  fullscreen: true, // default: true
});

const onFullscreenChange = async () => {
  const isFullscreen = await player.getFullscreen();

  if (isFullscreen) {
    await player.exitFullscreen();
    return;
  }

  await player.requestFullscreen();
};
```
