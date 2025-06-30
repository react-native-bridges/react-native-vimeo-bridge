# react-native-vimeo-bridge

## 1.0.0

### Major Changes

- fbcc018: 🎉 Release react-native-vimeo-bridge v1.0.0

  - feat: support all vimeo embed options
    - https://developer.vimeo.com/player/sdk/embed
  - refactor: rename `VimeoPlayerInstance` to `VimeoPlayer` and component to `VimeoView`
    - Rename `VimeoPlayerInstance` class to `VimeoPlayer` for clearer API
    - Rename `VimeoPlayer` component to `VimeoView` following expo-video pattern
    - Improves developer experience with familiar naming conventions

  ❗ BREAKING CHANGE: `VimeoPlayer` component is now `VimeoView`, `VimeoPlayerInstance` type is now `VimeoPlayer`

## 0.2.0

### Minor Changes

- 14df839: feat(hook): add useVimeoOEmbed hook for fetching Vimeo video metadata
  - Reference: [Working with oEmbed: Embedding Videos](https://developer.vimeo.com/api/oembed/videos)

## 0.1.2

### Patch Changes

- 7a0ae19: docs(readme): add direct link to an Expo Go demo in the "Examples & Demo" section

## 0.1.1

### Patch Changes

- 38292f4: fix(styling): replace CSS file with inline iframe styling

  - Remove CSS file dependency causing webpack parse errors
  - Apply width/height styles directly via JavaScript after iframe loads
  - Improves package compatibility without requiring CSS loaders
  - Breaking Changes: The removal of `width`, `height`, `maxwidth`, `maxheight`, and `responsive` from VimeoPlayerOptions (https://github.com/vimeo/player.js/issues/38#issuecomment-242462979)

## 0.1.0

### Minor Changes

- bf0a2f0: feat: 🎉 Initial Release react-native-vimeo-bridge v0.1.0
