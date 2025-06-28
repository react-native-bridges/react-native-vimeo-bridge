# react-native-vimeo-bridge

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
