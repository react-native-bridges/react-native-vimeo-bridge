# react-native-vimeo-bridge

## 1.1.0

### Minor Changes

- d8a8dc2: feat: add support for multiple concurrent players

  - Enable simultaneous usage of multiple player instances
  - Implement independent instance management for each player
  - Support concurrent playback without interference

## 1.0.5

### Patch Changes

- 4ca6a1b: fix: resolve vimeo player memory leak and unnecessary re-subscriptions

  - Extract `throttleMs` from `callbackOrThrottle` to optimize `useEffect` dependencies
  - Add `controller.off()` cleanup logic when last listener is removed
  - Prevent memory leaks on component unmount

## 1.0.4

### Patch Changes

- ebb3792: docs(readme): change the text in Korean to English

## 1.0.3

### Patch Changes

- 5303b55: chore: include src folder in package.json files

  - Add src to files array for better debugging experience
  - Enables accurate source maps and stack traces for library users
  - Follows React Native library best practices

## 1.0.2

### Patch Changes

- b914d0b: chore(deps): remove unused @types/bun dependency. (No changes to app functionality)

## 1.0.1

### Patch Changes

- 07372f1: fix: register event listeners after Vimeo player is loaded

  - Move event listener registration inside 'loaded' callback to ensure proper timing
  - Emit 'loaded' event immediately when already triggered
  - Register other events only after player is fully initialized
  - Prevents race condition where useVimeoEvent subscribes before player is ready

  Fixes issue where dynamic event subscriptions were not working due to timing mismatch between player initialization and listener registration.

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
