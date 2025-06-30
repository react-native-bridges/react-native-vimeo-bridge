---
"react-native-vimeo-bridge": major
---

🎉 Release react-native-vimeo-bridge v1.0.0

- feat: support all vimeo embed options
  - https://developer.vimeo.com/player/sdk/embed
- refactor: rename `VimeoPlayerInstance` to `VimeoPlayer` and component to `VimeoView`
  - Rename `VimeoPlayerInstance` class to `VimeoPlayer` for clearer API
  - Rename `VimeoPlayer` component to `VimeoView` following expo-video pattern
  - Improves developer experience with familiar naming conventions

❗ BREAKING CHANGE: `VimeoPlayer` component is now `VimeoView`, `VimeoPlayerInstance` type is now `VimeoPlayer`
